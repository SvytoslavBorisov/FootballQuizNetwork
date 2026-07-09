# App fonts

Place the two app font files here:

- `FootballDisplay.ttf`
- `FootballText.ttf`

After adding or replacing font files, run:

```sh
npx react-native-asset
```

Use the exported names from `src/theme/fonts.ts` instead of writing font family
strings directly in components.
