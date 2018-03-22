/**
 * Modal Toggling
 */

const body = document.body
const modal = document.querySelector('.js-modal')
const wrap = document.querySelector('.js-wrap')

function onClick() {
  wrap.classList.toggle('blur')
  wrap.classList.toggle('mr-scrollbar-width')
  modal.classList.toggle('hide')
  body.classList.toggle('noscroll')
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [
    document.querySelector('.js-intro-bttn'),
    document.querySelector('.js-close-bttn'),
  ],
}
