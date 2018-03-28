const { readFileSync, writeFileSync } = require('fs')

const posthtml = require('posthtml')
// const beautify = require('posthtml-beautify')
const auto = require('posthtml-img-autosize')
const inline = require('posthtml-inline-assets')
const tidy = require('posthtml-tidy')

const html = readFileSync('src/index.html', 'utf8')

posthtml()
  .use(
    inline({
      from: 'src/index.js',
      inline: { script: false, style: false },
    })
  )
  .use(auto())
  .use(tidy())
  .process(html)
  .then(result => {
    writeFileSync('tmp/index.html', result.html)
  })
