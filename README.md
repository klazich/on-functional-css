<img src="src/img/kl-logo/kl-logo.svg" align="right">

# On Functional CSS

Recreating a [Medium](https://medium.com/) style article/blog post using
[Tachyons](http://tachyons.io/), the css toolkit.

> [https://klazich.github.io/on-functional-css/](https://klazich.github.io/on-functional-css/)
> (built from `gh-pages` branch.)

---

## Table of Contents

* [**Introduction**](#introduction)
  * [Background](#background)
  * [What is Functional CSS?](#what-is-functional-css)
  * [Code Louisville FEWD Project Requirements](#project-requirements)
* [**Development**](#development)
  * [Requirements](#requirements)
  * [Clone & Install](#clone--install)
  * [Building The Webpage](#building-the-webpage)
  * [NPM scripts](#npm-scripts-packagejson)
    * [Start developing](#start-developing)
    * [Build production files](#build-production-files)
    * [Push build to GitHub Pages](#push-build-to-github-pages)
    * [Make the code look nice](#make-the-code-look-nice)
  * [Gulp Tasks](#gulp-tasks-gulpfilejs): [`images`](#images), [`misc`](#misc),
    [`content`](#content), [`scripts`](#scripts), [`styles`](#styles),
    [`server`](#server), [`watchers`](#watchers), [`assets`](#assets),
    [`build`](#build), [`start`](#start)
  * [PostCSS](#postcss)
* [**Additional Information**](#additional-information)
  * [Functional CSS](#functional-css)
    * [Frameworks/Tool-kits](#frameworkstool-kits)
    * [Writings](#writings)
  * [Postcss Resources](#postcss-resources)
  * [Gulp/Webpack](#gulpwebpack)

## Introduction

### About

...

### Background

Examples of the layout and style I want to recreate:

* [Making new friends](https://medium.design/making-new-friends-601525dbf5a8)
* [Understanding React “Suspense”](https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6)

The content I will use for the blog post:

* [Css and Scalability](http://mrmrs.github.io/writing/2016/03/24/scalable-css/)
  by [Adam Morse](https://github.com/mrmrs)

The tools I will use:

* I will stick to using [Tachyons](http://tachyons.io/) as much as possible.
  When extending Tachyons I will use these guidelines:
  [Extending Basscss](https://github.com/basscss/basscss/blob/master/docs/guides/Basics.md#extending-basscss).

### What is Functional CSS?

> If you haven't heard of it, functional CSS (or atomic CSS/utility
> classes/immutable CSS - I could go on forever. There's not a good name) is the
> idea that instead of writing big, monolith components in my CSS, I write
> small, single property, immutable classes that can be assembled into a larger
> component in HTML.
>
> &mdash; _Marcelo Somers_,
> [**_Rationalizing Functional CSS_**](https://marcelosomers.com/writing/rationalizing-functional-css/)

For information on what functional/atomic css means see
[Additional Information](#additional-information) and read
"[Let’s Define Exactly What Atomic CSS is](https://css-tricks.com/lets-define-exactly-atomic-css/).
"

### Project Requirements

Follow this link to the [wiki]()

## Development

### Requirements

* [Node JS](https://nodejs.org/en/) `8.10.0` or later
* [yarn](https://yarnpkg.com/en/) `1.5.1` or later /
  [npm](https://www.npmjs.com/) `5.6.0` or later

### Clone & Install

Clone the project from Github,
[here](https://github.com/klazich/on-functional-css). Then `cd` into the new
directory...

```shell
$ git clone https://github.com/klazich/on-functional-css.git
$ cd on-functional-css
```

Then install packages with [npm](https://www.npmjs.com/) or
[yarn](https://yarnpkg.com/en/)...

```shell
$ yarn
# or
$ npm install
```

### Building The Webpage

The website is built from the source directory: `src/`, where the code is
written. With the environment variable `NODE_ENV=development` (default), files
will be built to the `tmp/` directory where a local dev server can serve from.
With `NODE_ENV=production` files will be built to the `dist/` directory and
ready to deploy.

There are roughly 4 build processes used in this order:

* #### Assets

  The Assets task involves processing and copying the image and icon files from
  `src/img/` (and copying `manifest.json`). [gulp-imagemin]() is used to
  compress and optimize images and add them to the destination directory.
  [gulp-newer]() make sure only new or changed files are processed (This is very
  useful when running the dev server).

* #### Content

  ...html

* #### Scripts

  ...javascript webpack babel

* #### Styles
  ...css postcss

### NPM scripts (`package.json`)

> _I like to use yarn for package management but `npm` will also work._

The `"start"` and `"build"` scripts simply run the [start](#start) and
[build](#build) Gulp tasks but sets the `NODE_ENV` environment variable before
hand.

#### Start developing

`$ yarn run start`

Sets the `NODE_ENV` environment variable to `development` with
[cross-env](https://www.npmjs.com/package/cross-env).

Builds the source files to the `dist/` directory before starting a local server
to serve them to the browser. The `src/` directory will be watched for changes
and rebuilt when detected. The browser will be reloaded or streamed to after
changes have been built.

#### Build production files

`$ yarn run build`

Sets the `NODE_ENV` environment variable to `production` with
[cross-env](https://www.npmjs.com/package/cross-env).

Builds the production ready files to `docs`.

#### Push build to GitHub Pages

`$ yarn run publish-gh-page`

I use this when I want to push the current build to the GitHub Pages site. It
stages changes in the `docs/` directory, commits them then pushes to the remote.

#### Make the code look nice

`$ yarn run prettier`

Runs [prettier](https://github.com/prettier/prettier) on the project root. Files
with these extensions are processed: `.js`, `.css`, `.json`, `.md`.

A `precommit` script is also set that will run prettier on staged files when
they are committed.

### Gulp Tasks (`gulpfile.js`)

**Note:** _`<dest>` is `dist` or `docs` depending on development or production
builds._

#### Images

`$ gulp images`

Optimizes images from `src/img/` and copies them to `<dest>/img/`.

#### Misc

`$ gulp misc`

Copies `manifest.json` to `<dest>/`.

#### Content

`$ gulp content`

Copies `index.html` from `src/` to `<dest>` and inlines `<img>` tags. If
building production files, it is also minified.

#### Scripts

`$ gulp scripts`

Javascript is written in ES6 and compiled with [babel](https://babeljs.io/) and
bundled with [webpack](https://webpack.js.org). Javascript files are read from
`src/js/` and bundled together to `<dest>/js/bundle.js`.

#### Styles

`$ gulp styles`

Uses various [postcss](https://github.com/postcss/postcss) processors to compile
the css (see the [PostCSS](#postcss) section for details on the plugins used).
Builds two files to `<dest>/css/`: the stylesheet and a minified stylesheet.

#### Server

`$ gulp server`

Initiates a development server using [Browsersync](https://browsersync.io/).
Browsersync will watch `js/`, `css/`, `index.html` at the `<dest>` directory and
reload or stream to the browser.

#### Watchers

`$ gulp watchers`

Watches for changes in the `src/` directory and executes a build function if
something is changed.

### _Grouped tasks_:

#### Assets

`$ gulp assets`

Runs the `images` and `misc` tasks in parallel.

#### Build

`$ gulp build`

Using the `clean`, `assets`, `content`, `scripts`, and `styles` tasks (in that
order) `build` creates the files needed for the site to work.

#### Start

`$ gulp start`

Runs the `build` task before running the `watchers` and `server` tasks. This
builds the files and also starts up the development server.

### PostCSS

---

## Additional Information

### Functional CSS

* [The Case for Atomic CSS](https://johnpolacek.github.io/the-case-for-atomic-css/)
  (A great collection of links)

#### Frameworks/Tool-kits

* [Tachyons](http://tachyons.io/)([GitHub](https://github.com/tachyons-css/tachyons/))
* [Basscss](http://basscss.com/)([GitHub](https://github.com/basscss/basscss/))
* [Solid CSS](https://solid.buzzfeed.com/)([GitHub](https://github.com/buzzfeed/solid))
* [Tailwind CSS](https://tailwindcss.com/)([GitHub](https://github.com/tailwindcss/tailwindcss))
* [Atomic CSS](https://acss.io/)([GitHub](https://github.com/acss-io/atomizer))

#### Writings

* [Challenging CSS Best Practices](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/)
* [Css and Scalability](http://mrmrs.github.io/writing/2016/03/24/scalable-css/)
  by **Adam Morse**
* [Full re-write in 10 days with tachyons and functional CSS: A case study](https://hackernoon.com/full-re-write-with-tachyons-and-functional-css-a-case-study-part-1-635ccb5fb00b)
* [Rationalizing Functional CSS](https://marcelosomers.com/writing/rationalizing-functional-css/)

### Postcss Resources

### Gulp/Webpack
