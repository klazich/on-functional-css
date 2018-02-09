# f(css)
On Funtional CSS

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
