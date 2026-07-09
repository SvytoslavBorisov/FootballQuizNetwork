# Football Quiz Network

This repository is generated from `footballquiz/src`.

Do not edit content here manually. Edit Excel files and media in the app repository, then export/publish again.

Current structure:

- `content/src-assets/` - exact mirror of `footballquiz/src/assets/`.
- `content/manifest.json` - JSON dataset descriptors and hashes.
- `content/media-index.json` - remote media lookup by slug.
- `scripts/validate-quiz-content.js` - CI/local content validation.

## Validate

```sh
npm install
npm run validate
```
