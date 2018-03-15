import { toggleDnFlex } from './toggle.js'

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

function headerPinUnpin() {
  let previousScrollY = 0
  let queued = false

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

    if (dy > 0) unpin('header')
    if (dy < 0) pin('header')

    previousScrollY = window.scrollY
    queued = false
  }

  const onScroll = () => {
    if (!queued) requestAnimationFrame(update)
    queued = true
  }

  document.addEventListener('scroll', onScroll, false)
}


function injectSnippets() {
  const figureElements = document.querySelectorAll('figure[type=snippet]')
  const codeSnippets = [
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
    .forEach((pre, index) => figureElements[index].insertAdjacentHTML('afterbegin', pre))
}

function headerStyleToggling() {
  const stdElem = document.querySelectorAll('.--std')
  const altElem = document.querySelectorAll('.--alt')

  const onClick = () => {
    stdElem.forEach(toggleDnFlex)
    altElem.forEach(toggleDnFlex)
  }

  document.querySelector('.--alt .--toggle').addEventListener('click', onClick)
  document.querySelector('.--std .--toggle').addEventListener('click', onClick)
}

function loginViewToggling() {
  const loggedOt = document.getElementById('loggedOut')
  const loggedIn = document.getElementById('loggedIn')

  const onClick = () => {
    toggleDnFlex(loggedIn)
    toggleDnFlex(loggedOt)
  }

  loggedOt.querySelector('.--toggle').addEventListener('click', onClick)
  loggedIn.querySelector('.--toggle').addEventListener('click', onClick)
}

function focusOnSearchInput() {
  document.querySelector('#search>a').addEventListener('click', event => {
      event.currentTarget.nextElementSibling.focus()
    })
}

// ----- MODAL

function toggleModal() {

  const toggle = document.querySelector('#modal-toggle'),
        bttn   = document.querySelector('#modal-bttn'),
        modal  = document.querySelector('#modal'),
        wrap   = document.querySelector('#wrap'),
        body   = document.body

  const toggleBlur = elem => {
    elem.classList.toggle('blur')
  }
  const toggleHide = elem => {
    elem.classList.toggle('hide')
  }
  const toggleScroll = elem => {
    elem.classList.toggle('noscroll', !modal.classList.contains('hide'))
  }
  const toggleMargin = () => {
    body.classList.toggle('pr3')
    toggle.classList.toggle('mr3-ns')
  }

  toggle.addEventListener('click', () => {
    toggleBlur(wrap)
    toggleHide(modal)
    toggleScroll(body)
    toggleMargin()
  })
  bttn.addEventListener('click', () => {
    toggleBlur(wrap)
    toggleHide(modal)
    toggleScroll(body)
    toggleMargin()
  })
}

/**
 * Execute all functions from init
 */

const init = () => {
  injectSnippets()
  headerStyleToggling()
  loginViewToggling()
  focusOnSearchInput()
  headerPinUnpin()
  toggleModal()
}


init()
