# fivem_ts_boilerplate
A boilerplate for creating FiveM resources using TypeScript and React.

## Getting Started

### Node.js v22+
Install any LTS release of [`Node.js`](https://nodejs.org/) from v22.

### Bun
Install Bun from ['bun.sh'](https://bun.sh/).

### Setup
Initialise your own repository by using one of the options below:
- [Create a new repository](https://github.com/new?template_name=fivem_ts_boilerplate&template_owner=Magical-Network-Romania) using this template.
- [Download](https://github.com/Magical-Network-Romania/fivem_ts_boilerplate/archive/refs/heads/main.zip) the template directly.
- Use the [GitHub CLI](https://cli.github.com/).
  - `gh repo create <repo-name> --template=Magical-Network-Romania/fivem_ts_boilerplate`

Go to your new directory and execute the following command to install dependencies:
```
bun install
```

## Development
- During web development, use `bun run web` to start vite's web server and watch for changes.
- For code formatting and linting:
  - Use `bun run format` to just format the code using biome.
  - Use `bun run check` to format and lint the code using biome.


## Build
- During development use `bun run build`. This will create the fxmanifest file in the root directory, with compiled scripts in the dist directory. It exists so that you can easily develop the resource directly in the resources folder, without moving any files and only needing to restart the resource.
- For production use `bun run build:production`. This will output all the compiled files inside the dist directory, making it easy to transfer all of them on your server.

## Layout
- [/.vscode/](.vscode)
  - Settings for VS Code so that all members share them.
- [/assets/](assets)
 - Contains all the static files used by the resource such as configs, locales, images, icons, etc.
- [/dist/](dist)
  - Compiled project files.
- [/scripts/](scripts)
  - Scripts used in the development process, but not part of the compiled resource.
- [/shared/](shared)
 - Contains code that is used by both the web and the game (client and/or server).
- [/src/](src)
  - Contains the source code for the client and web.
- [/web/](web)
  - Contains the front-end code for the in-game web interface (NUI).