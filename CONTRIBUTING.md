# Contributing

> Thank you for your interest in contributing to this project! ❤️

## Installation

Requirements: [node] v22 or newer.

Clone and build the theme:

```bash
git clone git@github.com:frontend-garden/frontend-garden-ghost-theme.git
cd frontend-garden-ghost-theme
npm install
npm run build
```

## Local development

There are two ways to see the theme rendered against a running Ghost
instance:

### Option A: `ghost-dev` (Frontend Garden team members)

Clone [`ghost-dev`][ghost-dev] as a sibling directory next to this one and
follow its README:

```bash
cd ..
git clone git@github.com:frontend-garden/ghost-dev.git
```

`ghost-dev` is a Dockerized, restorable Ghost environment built for this
theme — it boots a full local site (Ghost, MySQL, an image proxy that falls
back to production, and Mailpit for testing member emails) from a single
command, bind-mounts this theme directory straight in, and picks up template,
SCSS, and JS edits live with no restart. `ghost-dev` is a **private**
repository, so this option needs access to it — if you don't have that, use
Option B below.

### Option B: manual Ghost install

1. Follow the official [Ghost setup guide][ghost-setup] to install Ghost
   locally on your machine.

2. Clone the theme into the `<YOUR_GHOST_INSTALLATION>/content/themes`
   directory. Optionally clone the theme to a place of your choice and create
   a symlink in the said destination. Either way you should end up with this
   structure:
   `<YOUR_GHOST_INSTALLATION>/content/themes/frontend-garden-ghost-theme`.

3. In the Ghost installation directory run `ghost start`.

4. Visit `http://localhost:2368` in your browser.

5. Activate `frontend-garden-ghost-theme` on the _Design_ administration page.
   ⚠️ Do not try to re-upload the theme. If you followed step 2 it's already
   there!

6. In the theme root there is a `routes.yaml` file. Upload this single file
   using _Routes_ on the _Labs_ administration page.

7. Congrats, you're done! 🎉

#### Live reload

`npm start` (or `npm run watch`) in the theme root rebuilds CSS/JS on change —
`nodemon` is a regular devDependency now, no global install needed for that
part.

To also restart the Ghost server itself when a template/style/script file
changes, install [nodemon] globally and run it from the Ghost installation
directory:

```bash
npm install --global nodemon
nodemon current/index.js --watch content/themes/frontend-garden-ghost-theme --ext hbs,js,css
```

[node]: https://nodejs.org
[ghost-setup]: https://ghost.org/docs/setup/
[nodemon]: https://nodemon.io
[ghost-dev]: https://github.com/frontend-garden/ghost-dev
