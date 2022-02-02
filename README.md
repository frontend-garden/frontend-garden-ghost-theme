# Frontend Garden Ghost Theme

![Build and test](https://github.com/frontend-garden/frontend-garden-ghost-theme/workflows/Build%20and%20test/badge.svg)

Minimalist theme for the 🍀 [Frontend Garden] online magazine powered by
👻 [Ghost].

> 👉🏻 **Please note this theme is designed solely for the purposes of the
> 🍀 [Frontend Garden] magazine.** It's not intended to work out-of-the-box or
> get modified for any Ghost publications other than 🍀 [Frontend Garden].
> However, please do [fell free](#license) to try out the theme and use it as a
> source of inspiration!

## Theme Build and Activation

Requirements: [node] v14 or newer.

1. Clone the theme:

   ```bash
   git clone git@github.com:frontend-garden/frontend-garden-ghost-theme.git
   ```

2. Build the theme:

   ```bash
   cd frontend-garden-ghost-theme
   npm install
   npm run build
   ```

3. Prepare distribution ZIP package into the `dist` directory:

   ```bash
   npm run dist
   ```

4. Upload the ZIP package
   `dist/frontend-garden-ghost-theme-<VERSION_NUMBER>.zip` on the _Design_
   administration page of your Ghost publication and activate
  `frontend-garden-ghost-theme`.

5. In the theme root there is a `routes.yaml` file. Upload this single file
   using _Routes_ on the _Labs_ administration page.

6. Congrats, you're done! 🎉

## Contributing

See [Contributing guidelines][contributing] and
[Releasing instructions][releasing].

## License

Licensed under [Apache 2.0 license][license].

[Frontend Garden]: https://frontend.garden
[Ghost]: https://ghost.org
[node]: https://nodejs.org
[contributing]: https://github.com/frontend-garden/frontend-garden-ghost-theme/blob/main/CONTRIBUTING.md
[releasing]: https://github.com/frontend-garden/frontend-garden-ghost-theme/blob/main/RELEASING.md
[license]: https://github.com/frontend-garden/frontend-garden-ghost-theme/blob/main/LICENSE.md
