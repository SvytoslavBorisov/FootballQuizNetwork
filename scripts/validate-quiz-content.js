const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { Buffer } = require('node:buffer');
const XLSX = require('xlsx');

const rootDir = process.cwd();
const dataRoot = path.join(rootDir, 'src', 'assets', 'data');
const mediaRoot = path.join(rootDir, 'src', 'assets', 'media');
const sourceAssetsRoot = path.join(rootDir, 'content', 'src-assets');
const sourceDataRoot = path.join(sourceAssetsRoot, 'data');
const sourceMediaRoot = path.join(sourceAssetsRoot, 'media');
const manifestPath = path.join(rootDir, 'content', 'manifest.json');
const mediaIndexPath = path.join(rootDir, 'content', 'media-index.json');

const resolvedDataRoot = fs.existsSync(dataRoot) ? dataRoot : sourceDataRoot;
const resolvedMediaRoot = fs.existsSync(mediaRoot) ? mediaRoot : sourceMediaRoot;
const workbookPrefixes = (process.env.VALIDATE_PREFIXES || 'logo_,stadium_')
  .split(',')
  .map(item => item.trim().toLowerCase())
  .filter(Boolean);
const shouldValidateRemoteDownloads = process.env.VALIDATE_REMOTE_DOWNLOADS === '1';

const errors = [];
const warnings = [];
const requiredMediaSlugs = new Set();

function normalizeText(value) {
  return String(value ?? '').trim();
}

function toPosixPath(value) {
  return value.replace(/\\/g, '/');
}

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function sha256File(filePath) {
  return sha256Buffer(fs.readFileSync(filePath));
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(rootDir, filePath)}: invalid JSON (${error.message})`);
    return null;
  }
}

function collectFiles(directory, predicate) {
  const files = [];
  if (!fs.existsSync(directory)) {
    return files;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, predicate));
    } else if (predicate(entry.name, fullPath)) {
      files.push(fullPath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function collectWorkbookFiles(directory) {
  return collectFiles(
    directory,
    fileName =>
      workbookPrefixes.some(prefix => fileName.toLowerCase().startsWith(prefix)) &&
      /\.xlsx$/i.test(fileName),
  );
}

function collectMediaSlugs(directory) {
  const slugs = new Set();
  for (const filePath of collectFiles(directory, fileName => /\.(png|jpe?g|webp)$/i.test(fileName))) {
    slugs.add(path.parse(filePath).name.toLowerCase());
  }
  return slugs;
}

function rememberMediaSlug(slug) {
  const normalized = normalizeText(slug).toLowerCase();
  if (normalized && normalized !== 'no_pic') {
    requiredMediaSlugs.add(normalized);
  }
}

function collectWrongAnswerIndexes(row) {
  const indexes = new Set();
  for (const key of Object.keys(row)) {
    const match = key.match(/^(?:wrTxtAns|wrSlgAns)(\d+)$/i);
    if (match) {
      indexes.add(Number.parseInt(match[1], 10));
    }
  }
  return Array.from(indexes).sort((left, right) => left - right);
}

function validateWorkbook(filePath, mediaSlugs) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    errors.push(`${filePath}: workbook has no sheets`);
    return;
  }

  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
  if (rows.length === 0) {
    errors.push(`${filePath}: first sheet has no rows`);
    return;
  }

  rows.forEach((row, rowIndex) => {
    const label = `${path.relative(rootDir, filePath)} row ${rowIndex + 2}`;
    const questionText = normalizeText(row.textQue);
    const correctText = normalizeText(row.txtCorAns);
    const type = normalizeText(row.type);

    if (!questionText) {
      errors.push(`${label}: missing textQue`);
    }
    if (!correctText) {
      errors.push(`${label}: missing txtCorAns`);
    }
    if (type && !Number.isFinite(Number.parseInt(type, 10))) {
      errors.push(`${label}: type is not a number`);
    }

    const answers = [correctText];
    for (const wrongIndex of collectWrongAnswerIndexes(row)) {
      const wrongText = normalizeText(row[`wrTxtAns${wrongIndex}`]);
      const wrongSlug = normalizeText(row[`wrSlgAns${wrongIndex}`]);
      if (wrongText || wrongSlug) {
        answers.push(wrongText || wrongSlug);
      }
    }
    if (answers.filter(Boolean).length < 2) {
      errors.push(`${label}: fewer than 2 answers`);
    }

    for (const key of Object.keys(row)) {
      if (!/^(slugQue|slugDlg|slugCorAns|wrSlgAns\d+)$/i.test(key)) {
        continue;
      }
      const slug = normalizeText(row[key]).toLowerCase();
      rememberMediaSlug(slug);
      if (slug && slug !== 'no_pic' && !mediaSlugs.has(slug)) {
        errors.push(`${label}: missing media for ${key}=${slug}`);
      }
    }
  });
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function validateAnswer(answer, label) {
  if (!isObject(answer)) {
    errors.push(`${label}: answer must be an object`);
    return false;
  }

  if (!normalizeText(answer.id)) {
    errors.push(`${label}: answer.id is required`);
  }
  if (!normalizeText(answer.text)) {
    errors.push(`${label}: answer.text is required`);
  }
  if (typeof answer.isCorrect !== 'boolean') {
    errors.push(`${label}: answer.isCorrect must be boolean`);
  }

  rememberMediaSlug(answer.slug);
  return true;
}

function validateQuestion(question, label) {
  if (!isObject(question)) {
    errors.push(`${label}: question must be an object`);
    return;
  }

  const kind = normalizeText(question.kind);
  if (!normalizeText(question.id)) {
    errors.push(`${label}: id is required`);
  }
  if (!normalizeText(question.questionText)) {
    errors.push(`${label}: questionText is required`);
  }
  if (!['multi_choice', 'order_sequence', 'word_build', 'letter_input', 'true_false_series'].includes(kind)) {
    errors.push(`${label}: unsupported kind=${kind}`);
  }

  if (!isObject(question.media)) {
    errors.push(`${label}: media is required`);
  } else {
    rememberMediaSlug(question.media.questionSlug);
    rememberMediaSlug(question.media.dialogSlug);
    rememberMediaSlug(question.media.correctSlug);
  }

  if (kind === 'multi_choice') {
    if (!Array.isArray(question.answers) || question.answers.length < 2) {
      errors.push(`${label}: multi_choice answers must contain at least 2 items`);
    } else {
      let correctCount = 0;
      question.answers.forEach((answer, index) => {
        validateAnswer(answer, `${label}.answers[${index}]`);
        if (answer?.isCorrect === true) {
          correctCount += 1;
        }
      });
      if (correctCount !== 1) {
        errors.push(`${label}: multi_choice must have exactly 1 correct answer, got ${correctCount}`);
      }
    }
  }

  if (kind === 'order_sequence') {
    const payload = question.payload;
    if (!isObject(payload) || !Array.isArray(payload.items) || !Array.isArray(payload.correctOrder)) {
      errors.push(`${label}: order_sequence payload.items and payload.correctOrder are required`);
    } else if (payload.items.length !== payload.correctOrder.length) {
      errors.push(`${label}: order_sequence items/correctOrder length mismatch`);
    }
  }

  if (kind === 'word_build' || kind === 'letter_input') {
    const payload = question.payload;
    if (!isObject(payload) || !normalizeText(payload.answer)) {
      errors.push(`${label}: ${kind} payload.answer is required`);
    }
    if (!Number.isFinite(Number(payload?.maxLen)) || Number(payload.maxLen) <= 0) {
      errors.push(`${label}: ${kind} payload.maxLen must be positive`);
    }
  }

  if (kind === 'true_false_series') {
    const payload = question.payload;
    if (!isObject(payload) || !Array.isArray(payload.statements) || payload.statements.length === 0) {
      errors.push(`${label}: true_false_series payload.statements are required`);
    } else {
      payload.statements.forEach((statement, index) => {
        if (!normalizeText(statement?.text) || typeof statement?.isTrue !== 'boolean') {
          errors.push(`${label}.statements[${index}]: text and isTrue are required`);
        }
      });
    }
  }
}

function validatePack(pack, label) {
  if (!isObject(pack)) {
    errors.push(`${label}: pack must be an object`);
    return;
  }

  if (!normalizeText(pack.id)) {
    errors.push(`${label}: pack.id is required`);
  }
  if (!normalizeText(pack.titleRu)) {
    errors.push(`${label}: pack.titleRu is required`);
  }
  if (!Array.isArray(pack.items)) {
    errors.push(`${label}: pack.items must be an array`);
    return;
  }

  pack.items.forEach((question, index) => validateQuestion(question, `${label}.items[${index}]`));
}

function validateJsonContent(mediaSlugs) {
  const packLocationsById = new Map();

  function rememberPackId(pack, label) {
    const packId = normalizeText(pack?.id);

    if (!packId) {
      errors.push(`${label}: pack.id is required`);
      return;
    }

    const previousLocation = packLocationsById.get(packId);
    if (previousLocation) {
      errors.push(
        `${label}: duplicate pack.id "${packId}" (already used by ${previousLocation})`,
      );
      return;
    }

    packLocationsById.set(packId, label);
  }

  for (const filePath of collectFiles(resolvedDataRoot, fileName => /\.json$/i.test(fileName))) {
    const relative = toPosixPath(path.relative(rootDir, filePath));
    const json = readJson(filePath);
    if (!json) {
      continue;
    }

    if (Array.isArray(json.categories)) {
      json.categories.forEach((category, categoryIndex) => {
        if (Array.isArray(category?.packs)) {
          category.packs.forEach((pack, packIndex) =>
            rememberPackId(
              pack,
              `${relative}.categories[${categoryIndex}].packs[${packIndex}]`,
            ),
          );
        }
      });
    }

    if (Array.isArray(json.packs)) {
      json.packs.forEach((pack, packIndex) =>
        rememberPackId(pack, `${relative}.packs[${packIndex}]`),
      );
    }

    if (relative.endsWith('quiz-dataset.json')) {
      if (!Array.isArray(json.categories)) {
        errors.push(`${relative}: categories must be an array`);
      } else {
        json.categories.forEach((category, categoryIndex) => {
          if (!Array.isArray(category?.packs)) {
            errors.push(`${relative}: categories[${categoryIndex}].packs must be an array`);
            return;
          }
          category.packs.forEach((pack, packIndex) =>
            validatePack(pack, `${relative}.categories[${categoryIndex}].packs[${packIndex}]`),
          );
        });
      }
      continue;
    }

    if (relative.endsWith('clubs-packs.json') || relative.endsWith('logos-packs.json') || relative.endsWith('stadiums-packs.json')) {
      if (!Array.isArray(json.packs)) {
        errors.push(`${relative}: packs must be an array`);
      } else {
        json.packs.forEach((pack, index) => validatePack(pack, `${relative}.packs[${index}]`));
      }
      continue;
    }

    if (relative.endsWith('cup-levels.json')) {
      if (!Array.isArray(json.levels)) {
        errors.push(`${relative}: levels must be an array`);
      } else {
        json.levels.forEach((level, levelIndex) => {
          if (!Array.isArray(level?.items)) {
            errors.push(`${relative}: levels[${levelIndex}].items must be an array`);
            return;
          }
          level.items.forEach((question, questionIndex) =>
            validateQuestion(question, `${relative}.levels[${levelIndex}].items[${questionIndex}]`),
          );
        });
      }
    }
  }

  for (const slug of requiredMediaSlugs) {
    if (!mediaSlugs.has(slug)) {
      errors.push(`JSON content references missing media slug: ${slug}`);
    }
  }
}

function isDescriptor(value) {
  return (
    isObject(value) &&
    normalizeText(value.path) &&
    /^https:\/\//i.test(normalizeText(value.rawUrl)) &&
    /^[a-f0-9]{64}$/i.test(normalizeText(value.sha256)) &&
    Number.isFinite(Number(value.bytes))
  );
}

async function validateRemoteDownload(entry, label) {
  if (!shouldValidateRemoteDownloads) {
    return;
  }

  try {
    const response = await fetch(encodeURI(entry.rawUrl));
    if (!response.ok) {
      errors.push(`${label}: rawUrl download failed with HTTP ${response.status}`);
      return;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const actualHash = sha256Buffer(buffer);
    if (actualHash.toLowerCase() !== entry.sha256.toLowerCase()) {
      errors.push(`${label}: rawUrl sha256 mismatch`);
    }
  } catch (error) {
    errors.push(`${label}: rawUrl download failed (${error.message})`);
  }
}

async function validateManifestAndMediaIndex() {
  if (!fs.existsSync(manifestPath) && !fs.existsSync(mediaIndexPath)) {
    return;
  }

  const manifest = readJson(manifestPath);
  const mediaIndex = readJson(mediaIndexPath);
  if (!manifest || !mediaIndex) {
    return;
  }

  if (!Array.isArray(manifest.requiredMediaSlugs)) {
    errors.push('content/manifest.json: requiredMediaSlugs must be an array');
  } else {
    const missing = manifest.requiredMediaSlugs.filter(slug => !requiredMediaSlugs.has(normalizeText(slug).toLowerCase()));
    if (missing.length > 0) {
      errors.push(`content/manifest.json: requiredMediaSlugs contains slug(s) not used by JSON: ${missing.slice(0, 10).join(', ')}`);
    }
    for (const slug of requiredMediaSlugs) {
      if (!manifest.requiredMediaSlugs.includes(slug)) {
        errors.push(`content/manifest.json: requiredMediaSlugs missing ${slug}`);
      }
    }
  }

  if (!isObject(mediaIndex.bySlug)) {
    errors.push('content/media-index.json: bySlug must be an object');
    return;
  }

  for (const slug of requiredMediaSlugs) {
    if (!isDescriptor(mediaIndex.bySlug[slug])) {
      errors.push(`content/media-index.json: missing descriptor for required slug ${slug}`);
    }
  }

  const entries = Object.entries(mediaIndex.bySlug);
  for (const [slug, entry] of entries) {
    const label = `content/media-index.json.bySlug.${slug}`;
    if (!isDescriptor(entry)) {
      errors.push(`${label}: invalid descriptor`);
      continue;
    }

    const localPath = path.join(rootDir, entry.path);
    if (!fs.existsSync(localPath)) {
      errors.push(`${label}: local file does not exist at ${entry.path}`);
      continue;
    }

    const stat = fs.statSync(localPath);
    if (stat.size !== Number(entry.bytes)) {
      errors.push(`${label}: bytes mismatch (${stat.size} !== ${entry.bytes})`);
    }
    const actualHash = sha256File(localPath);
    if (actualHash.toLowerCase() !== entry.sha256.toLowerCase()) {
      errors.push(`${label}: local sha256 mismatch`);
    }

    await validateRemoteDownload(entry, label);
  }
}

async function main() {
  const workbookFiles = collectWorkbookFiles(resolvedDataRoot);
  const mediaSlugs = collectMediaSlugs(resolvedMediaRoot);

  if (workbookFiles.length === 0) {
    warnings.push(`No workbook files found in ${resolvedDataRoot}`);
  }

  for (const workbookFile of workbookFiles) {
    validateWorkbook(workbookFile, mediaSlugs);
  }

  validateJsonContent(mediaSlugs);
  await validateManifestAndMediaIndex();

  for (const warning of warnings) {
    console.warn(`[warn] ${warning}`);
  }

  if (errors.length > 0) {
    console.error(`[fail] Quiz content validation failed with ${errors.length} error(s):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `[ok] Quiz content validation passed: ${workbookFiles.length} workbook(s), ${mediaSlugs.size} media slug(s), ${requiredMediaSlugs.size} required slug(s).`,
  );
}

main().catch(error => {
  console.error(`[fail] Quiz content validation crashed: ${error.stack || error.message}`);
  process.exit(1);
});
