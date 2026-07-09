# Football Quiz Network

Remote content repository for FootballQuiz.

## Structure

- `content/sources/logos/` - source Excel files for emblem levels.
- `content/sources/stadiums/` - source Excel files for stadium levels.
- `content/bundles/` - generated JSON bundles used by the app.
- `content/media/questions/logos/` - media files referenced by logo questions.
- `content/media/questions/stadiums/` - media files referenced by stadium questions.
- `content/manifest.json` - bundle paths, raw URLs, hashes, and media base URL.
- `scripts/validate-quiz-content.js` - validates Excel rows and media slug coverage.

## Validate

```sh
npm install
npm run validate
```

The GitHub Actions workflow runs the same validation on every push and pull request.
