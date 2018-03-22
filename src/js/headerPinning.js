/**
 * Header Pinning/Unpinning on Scroll
 */

const header = document.querySelector('header')

const initial = {
  ticking: false,
  y: 0,
  dy: 0,
}

const updateY = state => num => ({
  ...state,
  y: num ? num : state.y,
  dy: num ? num - state.y : 0,
})

const setTicking = state => bool => ({
  ...state,
  ticking: bool,
})

const getDY = state => state.dy
const isScrollUp = state => getDY(state) < 0
const isScrollDown = state => getDY(state) > 0

// ----------------------------------------------

var latestKnownScrollY = 0,
  ticking = false,
  item = document.querySelectorAll('.item')

function update(doStuff) {
  // reset the tick so we can capture the next onScroll
  ticking = false
  doStuff()
}

function onScroll() {
  latestKnownScrollY = window.scrollY
  requestTick()
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update)
  }
  ticking = true
}

window.addEventListener('scroll', onScroll, false)

// ---------------------------------------------

function update(stuff) {
  ticking = false // reset the tick so we can capture the next onScroll
  stuff()
}

function onScroll() {
  ticking = ticking || requestAnimationFrame(update)
}

window.addEventListener('scroll', onScroll, false)

// ------------------------------------------------------

let y = 0

const onScroll = () => {
  const dy = window.scrollY - y

  if (dy > 0) header.style.transform = 'translateY(-200%)' // Δy > 0 -> scroll down -> hide header
  if (dy < 0) header.style.transform = 'translateY(0%)' // Δy < 0 -> scroll up   -> show header

  y = window.scrollY
}

function throttle(handler) {
  let ticking = false

  return event => {
    if (!ticking)
      requestAnimationFrame(
        // fires when screen has refreshed
        () => {
          ticking = false // reset flag
          handler(event) // pass event to handler
        }
      )
    ticking = true
  }
}

window.addEventListener('scroll', throttle(onScroll.bind({ y: 0 })))
