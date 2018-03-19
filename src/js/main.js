/**
 *
 */


// const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
// const trace = label => value => {
//   console.log(`${ label }: ${ value }`);
//   return value;
// };
// const composeM = chainMethod => (...ms) => (
//   ms.reduce((f, g) => x => g(x)[chainMethod](f))
// );
// const composePromises = composeM('then');


/**
 * Header pin/unpin on scrolling
 */

const header = document.querySelector('header')

window.addEventListener('scroll', throttle(onScroll.bind({ y: 0 })))


function onScroll() {
  const dy = window.scrollY - this.y

  if ( dy > 0 ) header.style.transform = 'translateY(-200%)'// Δy > 0 -> scroll down -> hide header
  if ( dy < 0 ) header.style.transform = 'translateY(0%)' // Δy < 0 -> scroll up   -> show header

  this.y = window.scrollY
}

function throttle(handle) {
  let painting = false    // to flag if painting
  let savedEvent          // to keep track of the last scrollY

  const runOnRepaint = () => { // fired only when screen has refreshed
    painting = false           // repaint is over
    handle(savedEvent)         // passed event to handle
  }

  return event => {    // the actual event handler
    savedEvent = event // save our event at each call
    if ( !painting ) { // only if we weren't already doing it
      painting = true  // repainting is starting
      requestAnimationFrame(runOnRepaint) // wait for next screen refresh
    }
  }
}


/**
 * Search bar open/close
 */

document.querySelector('#search a').addEventListener('click', event => {
  event.currentTarget.nextElementSibling.focus()
})

/**
 * Element show/hide toggling helper
 */

const toggleDnFlex = elem => {
  elem.classList.toggle('dn')
  elem.classList.toggle('flex')
}


/**
 * Header style toggling
 */

const headerStyleElements       = [
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


/**
 * Logged in & Logged out views toggling
 */

const queries = ['#loggedOut', '#loggedIn']
const parents = queries.map(query => document.querySelector(query))

parents.map(parent => parent.querySelector('.js-toggle'))
  .forEach(toggle => {
    toggle.addEventListener('click', () => {
      parents.forEach(toggleDnFlex)
    })
  })


/**
 * Introduction modal toggling
 */

const modal = document.querySelector('.js-modal')
const wrap  = document.querySelector('.js-wrap')

const modalToggles = [
  document.querySelector('.js-modal-toggle'),
  document.querySelector('.js-modal-bttn'),
]

modalToggles.forEach(elem => {
  elem.addEventListener('click', () => {
    wrap.classList.toggle('blur')
    wrap.classList.toggle('mr-scrollbar-width')
    modal.classList.toggle('hide')
    body.classList.toggle('noscroll')
  })
})
