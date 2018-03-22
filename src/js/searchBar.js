/**
 * Search Icon/Bar Toggling
 */

const searchInput = document.querySelector('#search input')

function onClick() {
  searchInput.focus()
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [document.querySelector('#search a')],
}
