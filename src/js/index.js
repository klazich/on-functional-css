
let codeSnippets = [
  "/* Start of reusable styles here */",
  ".homepage-promos .grid-50 {\n    width: 100%\n}\n.homepage-promos .grid-33 {\n    width: 100%\n}\n.homepage-promos .grid-34 {\n    width: 100%\n}",
  "#seo-container {\n    display: none;\n}",
  ".product-tab {\n    height: 530px;\n    width: 99.7%;\n}",
  ".container-inner.promo-status {\n    float: center;\n}",
  ".left {\n    float: left!important;\n}",
  ".left-max-scr1,\n.left-max-scr2,\n.left-max-scr3,\n.left-only-scr1 {\n    float: left;\n}",
  ".left-min-scr2,\n.left-min-scr3,\n.left-max-scr3,\n.left-only-scr3 {\n    float: left;\n}",
  ".header-nav-container .header-nav-list {\n    float: left;\n}\n\n.CA .header-nav-list.second {\n    float: left;\n}\n\n#nav.challenger-a .submenu-3col li,\n#nav.challenger-a .submenu-3col li {\n    float: left;\n}",
  ".ie6 #footer-content .flex-control-nav li a,\n.ie7 #footer-content .flex-control-nav li a,\n.ie8 #footer-content .flex-control-nav li a {\n    float: left;\n}\n\n#nav.challenger-a li.menu-products {\n    float: left;\n}",
  ".container-inner.promo-status",
  ".red {\n    color: #FF4136;\n}",
  "<div class“red”>Some text</div>",
]

const template = codeBlock => `  <figure class="css br2 bg-light-gray mh0 mh4-l">
    <pre class="pa3 pl4-ns f6 f5-ns"><code class="">${codeBlock}</code></pre>
  </figure>`

let snippetElements = document.querySelectorAll('div.snippet')

codeSnippets.forEach((value, index) => {
  snippetElements[index].innerHTML = template(value)
})
