# f(css)
Recreating a medium article page with Tachyons (tachyons-bootstrap).

Article: [Css and Scalability](http://mrmrs.github.io/writing/2016/03/24/scalable-css/)

by: Adam Morse `@MRMRS`

Recreating page:
- [Medium Branding Guidelines](https://medium.design/logos-and-brand-guidelines-f1a01a733592)
- [Making new friends](https://medium.design/making-new-friends-601525dbf5a8)

## Install
```
$ git clone https://github.com/klazich/OnFCSS.git
$ cd OnFCSS
$ yarn
```

## Gulp tasks
- source directory - `src/`
- destination directory - `build/`

### `gulp html`
Copies index.html from src to build.

### `gulp css:tachyons`
Pulls Tachyons css from `node_modules` into the src/css directory

### `gulp css:postcss`
Runs the postcss processors

### `gulp css:beautify`
Makes the css look nice

### `gulp css:minify`
Makes a minified copy of the css
