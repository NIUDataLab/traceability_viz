# Setup

- `npx create-snowpack-app . --template @snowpack/app-template-blank-typescript --force`
- delete everything in `public` except for `index.html`
- delete all `package.json` scripts except for `build` and `start`
- `npm i` the missing packages
- `npm start`
- start server `flask --app graph run --debug` or just run `server/start.bat`
- all of this is now outdated

- First, to be able to run this project, the following installs are required:
- `Python`, `pip`, `Node.js`, `npm`.
- Once this is done, the user only needs to type `./execute.bat`, which
- is the executable for this project. 
- Once this is done, the `execute.bat` file will check to see if the
- user has the necessary libraries used, and will download them
- if they do not.
- To terminate the execution, the user needs to hit `Crtl` + `C` 