### Fuse-box + Creating npm package.

This project is to get you started using FuseBox as module loader and bundler to create an npm package, using `TypeScript`.

## Develop
```bash
npm run
```

## Dist

```bash
npm run dist
```

Package.json contains the following fields:

```json
{
  "ts:main": "index.ts",
  "types": "index.ts",
  "main": "es5.js",
}
```

FuseBox will work with typescript once this package is installed.