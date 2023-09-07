# Setup

- `npx create-snowpack-app . --template @snowpack/app-template-blank-typescript --force`
- delete everything in `public` except for `index.html`
- delete all `package.json` scripts except for `build` and `start`
- `npm i` the missing packages
- `npm start`
- start server `flask --app graph run --debug` or just run `server/start.bat`