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

## Development with Live Reload

Requirements: [node](https://nodejs.org) v12 or newer.

Install [nodemon](https://nodemon.io):

```bash
npm install --global nodemon
```

In Ghost app directory:

```bash
nodemon current/index.js --watch content/themes/frontend-garden-ghost-theme --ext hbs,js,css
```

In Ghost theme directory:

```bash
npm start
```

## Releasing

Release workflow is very similar to the one of the
[React UI](https://react-ui.io/contribute/releasing) project. A brief summary
follows.

1. Once ready to release, **update theme version** in `package.json` and
   `package-lock.json`. See release draft on GitHub to get the right version
   number. **Don't combine this step with any other changes,** they wouldn't be
   reflected in the changelog.

2. Commit as `Release <VERSION_NUMBER>` to `release/<VERSION_NUMBER>` branch,
   push, create a pull request to `main`, and finally merge it. The release is
   now being automatically published.

3. Prepare distribution ZIP package into the `dist` directory:

   ```bash
   npm run dist
   ```

4. Upload the ZIP package
   `dist/frontend-garden-ghost-theme-<VERSION_NUMBER>.zip` on the _Design_
   administration page.

**Note:** prefix version number with `v` everywhere except in `package.json` and
`package-lock.json`.
