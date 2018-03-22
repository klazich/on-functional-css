/**
 * js/main.js
 * https://github.com/timoxley/functional-javascript-workshop
 */

import modal from './modal'
import headerNav from './headerNav'

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

/***** Scrollbar Width *******************************************************/

const scrollbarWidth = window.innerWidth - document.body.offsetWidth

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

/***** Search bar open/close *************************************************/

document.querySelector('#search a').addEventListener('click', event => {
  event.currentTarget.nextElementSibling.focus()
})

/***** Element show/hide toggling helper *************************************/

const toggleDnFlex = elem => {
  elem.classList.toggle('dn')
  elem.classList.toggle('flex')
}

/***** Header style toggling *************************************************/

const headerStyleElements = [
  ...document.querySelectorAll('.js-std'),
  ...document.querySelectorAll('.js-alt'),
]
const headerStyleElementToggles = [
  document.querySelector('.js-alt .js-toggle'),
  document.querySelector('.js-std .js-toggle'),
]

headerStyleElementToggles.forEach(elem => {
  elem.addEventListener('click', () => {
    headerStyleElements.forEach(toggleDnFlex)
  })
})
