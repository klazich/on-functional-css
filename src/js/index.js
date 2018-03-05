
/**
 * Google Font loader
 */
require('./fontLoader.js')

const comp = (f, g) => x => f(g(x))

/**
 * pin/unpin header with headroom.js
 */


/**
 * code snippet logic
 */

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
].map(text => `\n    <pre class="pa4 f7 f6-m f5-l overflow-x-auto"><code class="dark-gray lh-copy">${text}</code></pre>\n`)

let figureElements = document.querySelectorAll('figure[type=snippet]')

codeSnippets.forEach((value, index) => {
  figureElements[index].className += ' bg-black-10 nl3 nr3 mh4-l'
  figureElements[index].insertAdjacentHTML('afterbegin', value)
})

/**
 * Make Standard/Alternative Header Toggling
 */

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

/**
 * Make Login/Logout Metabar Toggling
 */

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

/**
 * Search-Bar Component
 */

document.querySelector('#search>a')
  .addEventListener('click', (event) => {
    event.currentTarget.nextElementSibling.focus()
  })