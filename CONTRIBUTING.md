# Contributing

> Thank you for your interest in contributing to this project! ❤️

## Installation

Requirements: [node] v16 or newer.

### Set up Ghost

Follow the official [Ghost setup guide][ghost-setup] to install Ghost locally on
your machine.

### Clone and Activate the Theme

1. Clone the theme into the `<YOUR_GHOST_INSTALLATION>/content/themes`
   directory. Optionally clone the theme to a place of your choice and create
   a symlink in the said destination. Either way you should end up with this
   structure:
   `<YOUR_GHOST_INSTALLATION>/content/frontend-garden-ghost-theme`.

2. In the theme root run:

   ```bash
   npm install
   npm run build
   ```

3. In the Ghost installation directory run `ghost start`.

4. Visit `http://localhost:2368` in your browser.

5. Activate `frontend-garden-ghost-theme` on the _Design_ administration page.
   ⚠️ Do not try to re-upload the theme. If you followed step 1 it's already
   there!

6. In the theme root there is a `routes.yaml` file. Upload this single file
   using _Routes_ on the _Labs_ administration page.

7. Congrats, you're done! 🎉

## Development with Live Reload

Install [nodemon] globally on your machine:

```bash
npm install --global nodemon
```

Run nodemon in the Ghost app directory:

```bash
nodemon current/index.js --watch content/themes/frontend-garden-ghost-theme --ext hbs,js,css
```

Start watching for changes in the `frontend-garden-ghost-theme` directory:

```bash
npm start
```

[ghost-setup]: https://ghost.org/docs/setup/
[node]: https://nodejs.org
[nodemon]: https://nodemon.io
