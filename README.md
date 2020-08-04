# Frontend Garden Ghost Theme

Minimalist theme for the 🍀 [Frontend Garden](https://frontend.garden) online
magazine powered by 👻 [Ghost](https://ghost.org).

## Installation

### Ghost

Follow the official [Ghost setup guide](https://ghost.org/docs/setup/).

### Theme

1. Clone the theme into the `<YOUR_GHOST_INSTALLATION>/content/themes`
   directory. Optionally clone the theme to a place of your choice and create
   a symlink in the said destination. Either way you should end up with this
   structure:
   `<YOUR_GHOST_INSTALLATION>/content/frontend-garden-ghost-theme`.
2. In the theme root there is a `routes.yaml` file. Upload this single file
   using _Routes_ on the _Labs_ administration page.
3. In the Ghost installation directory run `ghost start`.

## Theme Development with Live Reload

Requirements: [node](https://nodejs.org) v12 or newer.

Install [Gscan](https://gscan.ghost.org) and [nodemon](https://nodemon.io):

```bash
npm install --global gscan nodemon
```

In Ghost app directory:

```bash
nodemon current/index.js --watch content/themes/frontend-garden-ghost-theme --ext hbs,js,css
```

In Ghost theme directory:

```bash
npm run watch
```

## Theme Release

The following steps only apply for production environment.

1. Update theme version in `package.json` and `package-lock.json`.
2. Prepare distribution ZIP package into the `dist` directory:

   ```bash
   npm run dist
   ```

3. Upload the ZIP package `dist/frontend-garden-ghost-theme-v<THEME_VERSION>.zip`
   on the _Design_ administration page.
