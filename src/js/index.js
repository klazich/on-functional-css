/* code snippet logic */

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

const template = codeBlock => `\n    <pre class="pa3 pl4-ns f6 f5-ns overflow-x-auto"><code class="">${codeBlock}</code></pre>\n`

let snippetElements = document.querySelectorAll('figure[type=snippet]')

codeSnippets.forEach((value, index) => {
  snippetElements[index].innerHTML = template(value)
})

/* login/logout component */

let loggedOutView = document.getElementById('loggedOut')
let loggedInView  = document.getElementById('loggedIn')

loggedOutView
  .firstElementChild
  .addEventListener('click', (event) => {
    loggedInView.removeAttribute('style')
    loggedOutView.style.display = 'none'
  })

loggedInView
  .lastElementChild
  .addEventListener('click', (event) => {
    loggedOutView.removeAttribute('style')
    loggedInView.style.display = 'none'
  })

/* search-bar component */

document.querySelector('#search>a')
  .addEventListener('click', (event) => {
    event.currentTarget.nextElementSibling.focus()
  })
