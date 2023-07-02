# LinguaGapFill

LinguaGapFill is an innovative linguistic study tool aimed at examining and improving the process of language acquisition. It utilizes a method similar to the Masked Language Model approach, where participants are required to fill in missing words in sentences, providing a unique insight into how humans learn new languages

### How to run

```
npm install --save-dev electron
npm install --save-dev electron-winstaller
npm install electron-packager
npm start
```

### How to package app

```
electron-packager . --platform=win32 --arch=x64
```

### How to create installer

```
node installers/windows/createinstaller.js
```

### How to support linters

```
npm install eslint --save-dev
npm init @eslint/config
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

add the following lines to `package.json` under scripts section

```
"lint": "eslint .",
"format": "prettier --write ."
```

Use the following commands:

`npm run lint` or `npm run format`
