import { toggleElem } from './toggle.js'


function googleFontLoader() {
  const WebFont = require('webfontloader')
  WebFont.load({
    google: {
      families: [
        'Source Sans Pro:200,300,400,500,600,700,800',
        'Fira Mono:200,300,400,500,600,700,800',
        'PT Serif:200,300,400,500,600,700,800',
      ],
    },
  })
}

function headerPinUnpin() {
  let previousScrollY = 0
  let queued          = false

  const pin = (query) => {
    const elem = document.querySelector(query)
    elem.classList.remove('--unpinned')
    elem.classList.add('--pinned')
  }

  const unpin = (query) => {
    const elem = document.querySelector(query)
    elem.classList.remove('--pinned')
    elem.classList.add('--unpinned')
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

  const onScroll  = () => {
    if ( !queued ) requestAnimationFrame(update)
    queued = true
  }
  window.onscroll = onScroll
  // document.addEventListener('scroll', onScroll, false)
}


function injectSnippets() {
  const figureElements = document.querySelectorAll('figure[type=snippet]')
  const codeSnippets   = [
    '/* Start of reusable styles here */',
    '.homepage-promos .grid-50 {\n    width: 100%\n}\n.homepage-promos .grid-33 {\n    width: 100%\n}\n.homepage-promos .grid-34 {\n    width: 100%\n}',
    '#seo-container {\n    display: none;\n}',
    '.product-tab {\n    height: 530px;\n    width: 99.7%;\n}',
    '.container-inner.promo-status {\n    float: center;\n}',
    '.left {\n    float: left!important;\n}',
    '.left-max-scr1,\n.left-max-scr2,\n.left-max-scr3,\n.left-only-scr1 {\n    float: left;\n}',
    '.left-min-scr2,\n.left-min-scr3,\n.left-max-scr3,\n.left-only-scr3 {\n    float: left;\n}',
    '.header-nav-container .header-nav-list {\n    float: left;\n}\n\n.CA .header-nav-list.second {\n    float: left;\n}\n\n#nav.challenger-a .submenu-3col li,\n#nav.challenger-a .submenu-3col li {\n    float: left;\n}',
    '.ie6 #footer-content .flex-control-nav li a,\n.ie7 #footer-content .flex-control-nav li a,\n.ie8 #footer-content .flex-control-nav li a {\n    float: left;\n}\n\n#nav.challenger-a li.menu-products {\n    float: left;\n}',
    '.container-inner.promo-status',
    '.red {\n    color: #FF4136;\n}',
    '&lt;div class=“red”&gt;Some text&lt;/div&gt;',
  ]

  codeSnippets
    .map(text => `<code class="black-70 lh-copy fw3">${text}</code>`)
    .map(code => `\n    <pre class="pa4 f7 f6-m f5-l overflow-x-auto">${code}</pre>\n`)
    .forEach((pre, index) => {
      figureElements[index].className += ' bg-light-gray nl3 nr3 mh4-l'
      figureElements[index].insertAdjacentHTML('afterbegin', pre)
    })
}

/**
 * Toggling
 *
 * do -> change-------on--------when
 *       |class names |element  |event
 *       how                    what
 *       |add/remove            |click
 *                              on
 *                              |element
 */

function headerStyleToggling() {
  const stdElem = document.querySelectorAll('.--std')
  const altElem = document.querySelectorAll('.--alt')

  const onClick = () =>{
    stdElem.forEach(toggleElem)
    altElem.forEach(toggleElem)
  }

  document.querySelector('.--alt .--toggle').addEventListener('click', onClick)
  document.querySelector('.--std .--toggle').addEventListener('click', onClick)
}

function metabarToggling() {
  const loggedOt = document.getElementById('loggedOut')
  const loggedIn  = document.getElementById('loggedIn')

  const onClick = () => {
    toggleElem(loggedIn)
    toggleElem(loggedOt)
  }

  loggedOt.querySelector('.--toggle').addEventListener('click', onClick)
  loggedIn.querySelector('.--toggle').addEventListener('click', onClick)
}

/**
 * focusOnSearchInput
 *
 * This function attaches an event listener on the search icon that will
 * set focus on the text input field when the icon is clicked.
 */

function focusOnSearchInput() {
  document.querySelector('#search>a')
    .addEventListener('click', (event) => {
      event.currentTarget.nextElementSibling.focus()
    })
}


/**
 *
 */

function closeIntro() {
  let isOpen = true
  document.querySelector('#intro-content .--closer')
    .addEventListener('click', () => {
      document.querySelector('.blur').classList.remove('blur')
      document.querySelector('#intro').classList.add('dn')
    })
}

/**
 * Execute all functions from init
 */

const init = () => {
  googleFontLoader()
  injectSnippets()
  headerStyleToggling()
  metabarToggling()
  focusOnSearchInput()
  headerPinUnpin()
  closeIntro()
}

/**
 * Execute javascript functions
 */

window.onload = init
