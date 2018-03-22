/**
 * Modal Toggling
 */

const scrollbarWidth = Math.floor(window.outerWidth - window.innerWidth)

const body = document.body
const modal = document.querySelector('.js-modal')
const wrap = document.querySelector('.js-wrap')
const introBttn = document.querySelector('.js-intro-bttn')

function onClick() {
  modal.classList.toggle('hide')
  introBttn.classList.toggle('hide')
  body.classList.toggle('noscroll')
  wrap.classList.toggle('blur')

  wrap.hasAttribute('style')
    ? wrap.removeAttribute('style')
    : wrap.setAttribute('style', `margin-right: ${scrollbarWidth}px`)
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [
    document.querySelector('.js-intro-bttn'),
    document.querySelector('.js-close-bttn'),
  ],
}
