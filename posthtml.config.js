module.exports = ctx =>
  ctx.env === 'production'
    ? {
        parser: ctx.ext === '.sml' ? 'posthtml-sugarml' : false,
        from: ctx.from,
        to: ctx.to,
        plugins: {
          'posthtml-plugin': ctx.plugin,
        },
      }
    : {}
