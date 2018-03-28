module.exports = ctx => {
  return ctx.env === 'production'
    ? {
        plugins: {
          htmlnano: {},
        },
      }
    : {
        plugins: {
          'posthtml-inline-assets': {
            root: 'src',
          },
          'posthtml-img-autosize': {
            root: 'src/img',
          },
          'posthtml-beautify': {},
          htmlnano: {},
        },
      }
}
