/**
 * Modal toggling
 */


/***** Elements ********************************/

const
  body = document.body,
  modal = document.querySelector('.js-modal'),
  wrap = document.querySelector('.js-wrap'),
  introBttn = document.querySelector('.js-intro-bttn'),
  closeBttn = document.querySelector('.js-close-bttn');

/***** Handle **********************************/

const onClick = () => {
  wrap.classList.toggle('blur')
  wrap.classList.toggle('mr-scrollbar-width')
  modal.classList.toggle('hide')
  body.classList.toggle('noscroll')
}

/***** Export **********************************/

export default {
  type: 'click',
  handle: onClick,
  triggers: [introBttn, closeBttn]
}
