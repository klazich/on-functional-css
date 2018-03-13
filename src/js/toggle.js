/**
 * toggle.js
 */

const getElemBy = method => query => document[method](query)

export const toggleDnFlex = (elem) => {
  elem.classList.toggle('dn')
  elem.classList.toggle('flex')
}

function toggleElements (...elements) {
  elements.forEach(toggleDnFlex)
}