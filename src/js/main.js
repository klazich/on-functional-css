
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

{

  let y = 0
  let painting = false
  const header = document.querySelector('header')

  window.addEventListener('scroll', throttle(() => {
    const dy = window.scrollY - y

    // Δy > 0 -> scroll down -> hide header
    if (dy > 0) header.style = 'transform: translateY(-200%);'
    // Δy < 0 -> scroll up   -> show header
    if (dy < 0) header.style = 'transform: translateY(0%);'

    y = window.scrollY
  }))

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
    if (!painting) {   // only if we weren't already doing it
      painting = true  // repainting is starting
      requestAnimationFrame(runOnRepaint) // wait for next screen refresh
    }
  }
}



// const update = () => {
//   const dy = window.scrollY - prevScrollY // Δy is change in y

//   if ( dy > 0 ) header.style = 'transform: translateY(-200%);' // scroll down -> hide header
//   if ( dy < 0 ) header.style = 'transform: translateY(0%);'    // scroll up -> show header

//   painting = false             // frame painted, ready for next
//   prevScrollY = window.scrollY // hold on to scrollY value for next event
// }

// const onScroll = () => {
//   // see: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
//   if ( !painting ) requestAnimationFrame(update)
//   painting = true
// }

// document.addEventListener('scroll', onScroll, false)


/**
 * Figure code snippet injections
 */

const codeSnippets = [
  '/* Start of reusable styles here */',
  '.homepage-promos .grid-50 {\n    width: 100%\n}\n.homepage-promos .grid-33 {\n    width: 100%\n}\n.homepage-promos .grid-34 {\n    width: 100%\n}',
  '#seo-container {\n    display: none;\n}',
  '.product-tab {\n    height: 530px;\n    width: 99.7%;\n}',
  '.container-inner.promo-status {\n    float: center;\n}',
  '.left {\n    float: left !important;\n}',
  '.left-max-scr1,\n.left-max-scr2,\n.left-max-scr3,\n.left-only-scr1 {\n    float: left;\n}',
  '.left-min-scr2,\n.left-min-scr3,\n.left-max-scr3,\n.left-only-scr3 {\n    float: left;\n}',
  '.header-nav-container .header-nav-list {\n    float: left;\n}\n\n.CA .header-nav-list.second {\n    float: left;\n}\n\n#nav.challenger-a .submenu-3col li,\n#nav.challenger-a .submenu-3col li {\n    float: left;\n}',
  '.ie6 #footer-content .flex-control-nav li a,\n.ie7 #footer-content .flex-control-nav li a,\n.ie8 #footer-content .flex-control-nav li a {\n    float: left;\n}\n\n#nav.challenger-a li.menu-products {\n    float: left;\n}',
  '.container-inner.promo-status',
  '.red {\n    color: #FF4136;\n}',
  '&lt;div class=“red”&gt;Some text&lt;/div&gt;',
]

const figureElements = document.querySelectorAll('figure.css, figure.html')

codeSnippets
  .map(text => `<code class="black-70 lh-copy fw3">${text}</code>`)
  .map(code => `\n    <pre class="pa4 f7 f6-m f5-l overflow-x-auto">${code}</pre>\n`)
  .forEach((pre, index) => figureElements[index].insertAdjacentHTML('afterbegin', pre))


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
 * Search bar open/close
 */

document.querySelector('#search>a').addEventListener('click', event => {
  event.currentTarget.nextElementSibling.focus()
})


/**
 * Introduction Modal toggling
 */

const modal = document.querySelector('.js-modal')
const wrap  = document.querySelector('.js-wrap')
const body  = document.body

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
