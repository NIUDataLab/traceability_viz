# CWE/CAPEC Graph Visualization

This program shows visualizations of the relationships between the CWE and CAPEC datasets.
Different visualizations are present varying from showing the risk based on a start node
and distance, to showing the basic relationsions between the different nodes present.

## Setup

- `npx create-snowpack-app . --template @snowpack/app-template-blank-typescript --force`
- delete everything in `public` except for `index.html`
- delete all `package.json` scripts except for `build` and `start`
- `npm i` the missing packages
- `npm start`
- start server `flask --app graph run --debug` or just run `server/start.bat`
- This first part of the setup needs to be updated/changed now

- First, to be able to run this project, the following installs are required:
`Python`, `pip`, `Node.js`, `npm`. Once this is done, the user only needs to type `./execute.bat`, which
is the executable for this project. Once this is done, the `execute.bat` file will check to see if the
user has the necessary libraries used, and will download them if they do not. To terminate the execution, the user needs to hit `Crtl` + `C`.

### Important Notes

This project utilizes a FLASK python server, and a snowpack server for compiling typescript into javascript.
This project uses python for the heavier algorithm calculations, because typescript/javascript is to slow
for the calculations.