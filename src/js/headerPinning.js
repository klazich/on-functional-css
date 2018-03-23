/**
 * Header Pinning/Unpinning on Scroll
 */

import throttle from 'lodash/throttle'

const header = document.querySelector('header')
let y = 0

function onScroll() {
  const dy = window.scrollY - y

  // Δy > 0 -> scroll down -> hide header
  if (dy > 0) header.style.transform = 'translateY(-200%)'
  // Δy < 0 -> scroll up -> show header
  if (dy < 0) header.style.transform = 'translateY(0%)'

  y = window.scrollY
}

export default {
  type: 'scroll',
  handle: throttle(onScroll, 100),
  triggers: [window],
}
