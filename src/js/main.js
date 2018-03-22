/**
 * js/main.js
 * https://github.com/timoxley/functional-javascript-workshop
 */

import modal from './modal'
import headerNav from './headerNav'
import headerStyle from './headerStyle'
import searchBar from './searchBar'

/***** Add Listeners *********************************************************/

// const addListeners = obj => {
//   obj.triggers.forEach(elem => {
//     elem.addEventListener(obj.type, obj.handle)
//   })
// }

modal.triggers.forEach(elem => {
  elem.addEventListener(modal.type, modal.handle)
})
headerNav.triggers.forEach(elem => {
  elem.addEventListener(headerNav.type, headerNav.handle)
})
headerStyle.triggers.forEach(elem => {
  elem.addEventListener(headerStyle.type, headerStyle.handle)
})
searchBar.triggers.forEach(elem => {
  elem.addEventListener(searchBar.type, searchBar.handle)
})

/***** Header pin/unpin on scrolling *****************************************/

window.addEventListener('scroll', throttle(onScroll.bind({ y: 0 })))

const header = document.querySelector('header')

function onScroll() {
  const dy = window.scrollY - this.y

  if (dy > 0) header.style.transform = 'translateY(-200%)' // Δy > 0 -> scroll down -> hide header
  if (dy < 0) header.style.transform = 'translateY(0%)' // Δy < 0 -> scroll up   -> show header

  this.y = window.scrollY
}

function throttle(handle) {
  let painting = false // to flag if painting
  let savedEvent // to keep track of the last scrollY

  const runOnRepaint = () => {
    // fired only when screen has refreshed
    painting = false // repaint is over
    handle(savedEvent) // passed event to handle
  }

  return event => {
    // the actual event handler
    savedEvent = event // save our event at each call
    if (!painting) {
      // only if we weren't already doing it
      painting = true // repainting is starting
      requestAnimationFrame(runOnRepaint) // wait for next screen refresh
    }
  }
}
