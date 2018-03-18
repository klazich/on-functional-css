/**
 * Header pin/unpin on scrolling
 */

let previousScrollY = 0
let queued          = false

const pin = query => {
  const elem = document.querySelector(query)
  elem.classList.remove('js-unpinned')
  elem.classList.add('js-pinned')
}

const unpin = query => {
  const elem = document.querySelector(query)
  elem.classList.remove('js-pinned')
  elem.classList.add('js-unpinned')
}

const update = () => {
  const dy = window.scrollY - previousScrollY // Δy is change in y
  // (Δy > 0) scroll movement down -> hide header
  // (Δy < 0) scroll movement up   -> show header
  // (Δy = 0) no scroll movement   -> do nothing
  if ( dy > 0 ) unpin('header')
  if ( dy < 0 ) pin('header')

  previousScrollY = window.scrollY
  queued          = false
}

const onScroll = () => {
  if ( !queued ) requestAnimationFrame(update)
  queued = true
}

document.addEventListener('scroll', onScroll, false)


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

const loggedViewsElements = [document.querySelector('#loggedOut'), document.querySelector('#loggedIn')]
const loggedViewsToggles  = loggedViewsElements.map(elem => elem.querySelector('.js-toggle'))

loggedViewsToggles.forEach(elem => {
  elem.addEventListener('click', () => {
    loggedViewsElements.forEach(toggleDnFlex)
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
