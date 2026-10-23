import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// Installed beside easy-club-questions.json in FootballQuizNetwork/world-football.
const directory = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = name => args[args.indexOf(name) + 1];
if (!args.includes('--home') || !args.includes('--away') || args.length !== 4) throw new Error('Use --home club_barcelona --away club_realmadrid');
const catalog = JSON.parse(fs.readFileSync(path.join(directory, 'easy-club-questions.json'), 'utf8'));
const home = catalog.packs.find(pack => pack.id === flag('--home'));
const away = catalog.packs.find(pack => pack.id === flag('--away'));
if (!home || !away || home.id === away.id) throw new Error('Choose two different catalog clubs.');
if (![home, away].every(pack => pack.items.length && pack.items.every(question => question.difficulty === 'easy'))) throw new Error('Both clubs must have explicitly easy questions.');
const id = `mt_${home.id.slice(5)}_${away.id.slice(5)}`;
const take = pack => pack.items.slice(0, 15).map(question => ({ ...question, id: `${id}__${question.id}`, sourceQuestionId: question.sourceQuestionId ?? question.id }));
const left = take(home), right = take(away);
const title = { ru: `${home.title.ru} — ${away.title.ru}`, en: `${home.title.en} — ${away.title.en}` };
const category = { id: 'matchday', title: { ru: 'Матч тура', en: 'Matchday' }, titleRu: 'Матч тура', packs: [{ id, title, titleRu: title.ru, items: Array.from({ length: Math.max(left.length, right.length) }, (_, index) => [left[index], right[index]].filter(Boolean)).flat() }] };
const json = value => JSON.stringify(value, null, 2) + '\n';
const content = json(category), file = `${id}.json`;
const pointer = { version: 1, file, sha256: createHash('sha256').update(content).digest('hex'), bytes: Buffer.byteLength(content) };
const data = path.join(directory, 'content/src-assets/data');
fs.mkdirSync(data, { recursive: true });
fs.writeFileSync(path.join(data, file), content);
fs.writeFileSync(path.join(data, 'matchday-fallback.json'), content);
fs.writeFileSync(path.join(data, 'current-matchday.json'), json(pointer));
const rawBase = 'https://raw.githubusercontent.com/SvytoslavBorisov/FootballQuizNetwork/main/world-football/content/';
const descriptor = name => {
  const relative = `src-assets/data/${name}`, bytes = fs.readFileSync(path.join(data, name));
  return { path: relative, rawUrl: rawBase + relative, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length };
};
fs.writeFileSync(path.join(directory, 'content/manifest.json'), json({ version: 1, updatedAt: new Date().toISOString(), datasets: { matchday_fallback: descriptor('matchday-fallback.json') }, requiredMediaSlugs: [] }));
console.log(`Published files prepared: ${title.en}, ${category.packs[0].items.length} easy questions, ${pointer.sha256}.`);
