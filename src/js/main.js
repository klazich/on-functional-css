/**
 * js/main.js
 * https://github.com/timoxley/functional-javascript-workshop
 */

import modal from './modal'
import headerNav from './headerNav'
import headerStyle from './headerStyle'
import searchBar from './searchBar'
import headerPinning from './headerPinning'

/***** Add Listeners ***************************/

modal.triggers.forEach(elem => {
  elem.addEventListener(modal.type, modal.handle)
})
headerNav.triggers.forEach(elem => {
  elem.addEventListener(headerNav.type, headerNav.handle)
})
headerStyle.triggers.forEach(elem => {
  elem.addEventListener(headerStyle.type, headerStyle.handle)
})
searchBar.triggers.forEach(elem => {
  elem.addEventListener(searchBar.type, searchBar.handle)
})
headerPinning.triggers.forEach(elem => {
  elem.addEventListener(headerPinning.type, headerPinning.handle)
})
