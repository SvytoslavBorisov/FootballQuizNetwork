# Football Quiz Network

This repository is generated from `footballquiz`.

Do not edit content here manually. Edit Excel files and media in the app repository, then export/publish again.

Current structure:

- `content/src-assets/` - exact mirror of `footballquiz/src/assets/`.
- `content/player-rosters/all-players.json` - verified player facts exported from official club sources.
- `content/manifest.json` - JSON dataset descriptors and hashes.
- `content/media-index.json` - remote media lookup by slug.
- `scripts/validate-quiz-content.js` - CI/local content validation.

## Validate

```sh
npm install
npm run validate
```
