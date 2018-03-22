/**
 * Modal Toggling
 */

const body = document.body
const modal = document.querySelector('.js-modal')
const wrap = document.querySelector('.js-wrap')
const introBttn = document.querySelector('.js-intro-bttn')

function onClick() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth

  wrap.hasAttribute('style')
    ? wrap.removeAttribute('style')
    : wrap.setAttribute('style', `margin-right: ${scrollBarWidth}px`)

  modal.classList.toggle('hide')
  introBttn.classList.toggle('hide')
  body.classList.toggle('noscroll')
  wrap.classList.toggle('blur')
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [
    document.querySelector('.js-intro-bttn'),
    document.querySelector('.js-close-bttn'),
  ],
}
