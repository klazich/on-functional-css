module.exports = {

  src: 'src/',
  dest: 'dist/',
  tmp: 'tmp/',

  styles: {
    src: 'src/styles/**/*.css',
    dest: 'dist/styles/',
    tmp: 'tmp/styles/',
  },

  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
    tmp: 'tmp/js/',
  },

  images: {
    src: 'src/images/**/*.{jpg,jpeg,png}',
    dest: 'dist/images/',
    tmp: 'tmp/images/',
  },

  html: {
    src: 'src/index.html',
    dest: 'dist/index.html',
    tmp: 'tmp/index.html',
  },

  tachyons: {
    src: 'node_modules/tachyons/src/tachyons.css',
    tmp: 'src/styles/tachyons.css',
    dest: 'src/styles/tachyons.css'
  },

}