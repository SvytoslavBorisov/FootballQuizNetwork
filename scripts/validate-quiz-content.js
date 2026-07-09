const fs = require('node:fs');
const path = require('node:path');
const XLSX = require('xlsx');

const rootDir = process.cwd();
const dataRoot = path.join(rootDir, 'src', 'assets', 'data');
const mediaRoot = path.join(rootDir, 'src', 'assets', 'media', 'questions');
const sourceAssetsRoot = path.join(rootDir, 'content', 'src-assets');
const sourceDataRoot = path.join(sourceAssetsRoot, 'data');
const sourceMediaRoot = path.join(sourceAssetsRoot, 'media', 'questions');

const resolvedDataRoot = fs.existsSync(dataRoot) ? dataRoot : sourceDataRoot;
const resolvedMediaRoot = fs.existsSync(mediaRoot) ? mediaRoot : sourceMediaRoot;
const workbookPrefixes = (process.env.VALIDATE_PREFIXES || 'logo_,stadium_')
  .split(',')
  .map(item => item.trim().toLowerCase())
  .filter(Boolean);

const errors = [];
const warnings = [];

function normalizeText(value) {
  return String(value ?? '').trim();
}

function collectWorkbookFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectWorkbookFiles(fullPath));
    } else if (
      workbookPrefixes.some(prefix => entry.name.toLowerCase().startsWith(prefix)) &&
      /\.xlsx$/i.test(entry.name)
    ) {
      files.push(fullPath);
    }
  }
  return files.sort((left, right) => left.localeCompare(right));
}

function collectMediaSlugs(directory) {
  const slugs = new Set();
  if (!fs.existsSync(directory)) {
    return slugs;
  }

  const stack = [directory];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
        slugs.add(path.parse(entry.name).name.toLowerCase());
      }
    }
  }
  return slugs;
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
      if (!slug || slug === 'no_pic') {
        continue;
      }
      if (!mediaSlugs.has(slug)) {
        errors.push(`${label}: missing media for ${key}=${slug}`);
      }
    }
  });
}

const workbookFiles = collectWorkbookFiles(resolvedDataRoot);
const mediaSlugs = collectMediaSlugs(resolvedMediaRoot);

if (workbookFiles.length === 0) {
  errors.push(`No workbook files found in ${resolvedDataRoot}`);
}

for (const workbookFile of workbookFiles) {
  validateWorkbook(workbookFile, mediaSlugs);
}

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

console.log(`[ok] Quiz content validation passed: ${workbookFiles.length} workbook(s), ${mediaSlugs.size} media slug(s).`);
