# fivem_ts_boilerplate
A boilerplate for creating FiveM resources using TypeScript and React.

## Getting Started

### Node.js v22+
Install any LTS release of [`Node.js`](https://nodejs.org/) from v22.

### Setup
Initialise your own repository by using one of the options below:
- [Create a new repository](https://github.com/new?template_name=fivem_ts_boilerplate&template_owner=Magical-Network-Romania) using this template.
- [Download](https://github.com/Magical-Network-Romania/fivem_ts_boilerplate/archive/refs/heads/main.zip) the template directly.
- Use the [GitHub CLI](https://cli.github.com/).
  - `gh repo create <repo-name> --template=Magical-Network-Romania/fivem_ts_boilerplate`

Go to your new directory and execute the following command to install dependencies:
```
npm install
```

## Development
- Use `npm run watch` to actively rebuild modified files while developing the resource.
- During web development, use `npm run web:dev` to start vite's web server and watch for changes.
- For code formatting and linting:
  - Use `npm run format` to just format the code using biome.
  - Use `npm run check` to format and lint the code using biome.


## Build
Use `npm run build` to build all project files in production mode.

## Layout
- [/.vscode/](.vscode)
  - Settings for VS Code so that all members share the same settings.
- [/dist/](dist)
  - Compiled project files.
- [/locales/](locales)
  - JSON files used for translations with [ox_lib](https://overextended.dev/ox_lib/Modules/Locale/Shared).
- [/scripts/](scripts)
  - Scripts used in the development process, but not part of the compiled resource.
- [/src/](src)
  - Project source code.
- [/static/](static)
  - Files to include with the resource that aren't compiled or loaded (e.g. config).
- [/web/](web)
  - Contains the front-end code for the in-game web interface (NUI).