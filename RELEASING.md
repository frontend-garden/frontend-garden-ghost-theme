# Releasing

Release process is fully automated so you can release a new version just by
bumping version number in `package.json`. However, there are several chances to
adjust both version and changelog if you wish to do so for a reason.

## How It Works

1. Pull requests are automatically labelled by branch name. Labels are then used
   for:

    1. resolving next [semantic version number][semver]
       (BREAKING.FEATURE.PATCH),
    2. grouping changes in changelog.

2. Release draft with changelog is generated as pull requests are merged into
   the `main` branch. Invididual PR names are listed and grouped by type based
   on label(s) added to them previously.

See the source of `.github/workflows` for details.

## Release Process

1. **As you go:** Check out the release draft on
   [GitHub releases page][gh-releases] to see what the changelog looks like and
   what will be the next version number. **Don't edit manually until you are
   ready to publish the release.** Release draft is automatically overwritten
   everytime a change is merged to `main`.

2. **Manual:** once you are ready to publish a release:

    1. **Bump the version number** in `package.json` and `package-lock.json`.
       Make sure it matches the intended version number in the release draft.
       **Don't combine this step with any other changes,** they wouldn't be
       reflected in the changelog.

    2. Now is also your **chance to review and adjust (if necessary) the intended
       version and actual changelog before the release is published.**
       Automatic release drafting is skipped when a version change in
       `package.json` is  detected so this time your changes will not be
       overwritten. Save your changes in release draft with the _Save draft_
       button, **do not publish** yet!

    3. Get back to the repository, commit both files as
       `Release <VERSION_NUMBER>` in `release/<VERSION_NUMBER>` branch,
       create a pull request, hold your breath, and—merge it.

3. **Automatic:** once the release pull request from step 2.3 is merged, the
   following actions are triggered automatically:

    1. GitHub release draft with name corresponding to the version number from
       step 2 is published.
    2. Git tag with the version number from step 2 is added to `main` branch.
    3. Package is built and deployed to production Ghost publication.

**Note:** prefix version number with `v` everywhere except in `package.json` and
`package-lock.json`.

## Optional: Manual Theme Activation

Useful when you want to quickly try out your changes in any (even production!)
environment before making actual release of the theme.

1. Adjust version number in `package.json` to your needs, e.g. `3.1.0-rc1`.

2. Prepare distribution ZIP package into the `dist` directory:

   ```bash
   npm run dist
   ```

3. Upload the ZIP package
   `dist/frontend-garden-ghost-theme-<VERSION_NUMBER>.zip` on the _Design_
   administration page and activate the theme.

[semver]: https://semver.org
[gh-releases]: https://github.com/frontend-garden/frontend-garden-ghost-theme/releases
