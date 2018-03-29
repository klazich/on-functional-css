const imagemin = require('imagemin')
const imageminSvgo = require('imagemin-svgo')
const imageminPngquant = require('imagemin-pngquant')

imagemin(['src/img/**/*.{svg,png}'], 'dist/img', {
  plugins: [
    imageminSvgo({ plugins: [{ removeViewBox: false }] }),
    imageminPngquant({ quality: '65-80' }),
  ],
}).then(files => {
  console.log(files)
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})

// const imagemin = require('imagemin')
// const imageminSvgo = require('imagemin-svgo')

// imagemin(['images/*.svg'], 'build/images', {
//   use: [
//     imageminSvgo({
//       plugins: [{ removeViewBox: false }],
//     }),
//   ],
// }).then(() => {
//   console.log('Images optimized')
// })
