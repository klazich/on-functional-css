/**
 * Header Theme Toggling
 */

import { toggleDnFlex } from './helpers'

const headerStyleElements = [
  ...document.querySelectorAll('.js-std'),
  ...document.querySelectorAll('.js-alt'),
]

function onClick() {
  headerStyleElements.forEach(toggleDnFlex)
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [
    document.querySelector('.js-alt .js-toggle'),
    document.querySelector('.js-std .js-toggle'),
  ],
}
