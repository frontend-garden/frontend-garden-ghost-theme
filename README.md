# Frontend Garden Ghost Theme

Minimalist theme for a [Ghost](http://github.com/tryghost/ghost/) blog.

## Theme Development with Live Reload

Requirements: [node](https://nodejs.org) v8 or newer.

Install [Gscan](https://gscan.ghost.org) and [nodemon](https://nodemon.io):

```bash
$ npm install --global gscan nodemon
```

In Ghost app directory:

```bash
$ nodemon current/index.js --watch content/themes/frontend-garden-ghost-theme --ext hbs,js,css
```

In Ghost theme directory:

```bash
$ npm run watch
```
