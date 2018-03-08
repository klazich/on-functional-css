/**
 * Google Font loader
 */
require('./fontLoader.js')

/**
 * pin/unpin header
 */
const headerPinUnpin =
  function () {
    let previousScrollY = 0
    let queued = false

    const pin = (query) => {
      let elem = document.querySelector(query)
      elem.classList.remove('--unpinned')
      elem.classList.add('--pinned')
    }

    const unpin = (query) => {
      let elem = document.querySelector(query)
      elem.classList.remove('--pinned')
      elem.classList.add('--unpinned')
    }

    const update = () => {
      let dy = window.scrollY - previousScrollY  // Δy is change in y

      dy > 0 ? unpin('header')    // (Δy > 0) scroll movement down -> hide header
        : dy < 0 ? pin('header')  // (Δy < 0) scroll movement up   -> show header
          : null                  // (Δy = 0) no scroll movement   -> do nothing

      previousScrollY = window.scrollY
      queued = false
    }

    const onScroll = () => {
      if(!queued) requestAnimationFrame(update)
      queued = true
    }

    document.addEventListener('scroll', onScroll, false)
  }



/**
 * code snippet logic
 */
const injectSnippets =
  function () {
    let figureElements = document.querySelectorAll('figure[type=snippet]')
    let codeSnippets = [
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
      .map(text => `<code class="dark-gray lh-copy">${text}</code>`)
      .map(code => `\n    <pre class="pa4 f7 f6-m f5-l overflow-x-auto">${code}</pre>\n`)
      .forEach((pre, index) => {
        figureElements[index].className += ' bg-black-10 nl3 nr3 mh4-l'
        figureElements[index].insertAdjacentHTML('afterbegin', pre)
      })
  }

/**
 * Make Standard/Alternative Header Toggling
 */
const headerStyleToggling =
  function () {
    let altToggle = document.querySelector('[name="alt"] [name="toggle"]')
    let stdToggle = document.querySelector('[name="std"] [name="toggle"]')

    altToggle.addEventListener('click', () => {
      document.querySelectorAll('[name="alt"]').forEach(elm => elm.style.display = 'none')
      document.querySelectorAll('[name="std"]').forEach(elm => elm.removeAttribute('style'))
    })

    stdToggle.addEventListener('click', () => {
      document.querySelectorAll('[name="std"]').forEach(elm => elm.style.display = 'none')
      document.querySelectorAll('[name="alt"]').forEach(elm => elm.removeAttribute('style'))
    })
  }

/**
 * Make Login/Logout Metabar Toggling
 */
const metabarToggling =
  function () {
    let loggedOut = document.getElementById('loggedOut')
    let loggedIn = document.getElementById('loggedIn')

    loggedOut.querySelector('[name=toggle]')
      .addEventListener('click', () => {
        loggedIn.removeAttribute('style')
        loggedOut.style.display = 'none'
      })

    loggedIn.querySelector('[name=toggle]')
      .addEventListener('click', () => {
        loggedOut.removeAttribute('style')
        loggedIn.style.display = 'none'
      })
  }

/**
 * Search-Bar Component
 */
const focusOnSearchInput =
  function () {
    document.querySelector('#search>a')
      .addEventListener('click', (event) => {
        event.currentTarget.nextElementSibling.focus()
      })
  }


/**
 * onload
 */
const init = () => {
  injectSnippets()
  headerStyleToggling()
  metabarToggling()
  focusOnSearchInput()
  headerPinUnpin()
}

window.onload = init