/**
 * Header nav Toggling (Logged-in/Logged-out)
 */

import { toggleDnFlex } from './helpers'

const viewLoggedIn = document.querySelector('#loggedIn')
const viewLoggedOut = document.querySelector('#loggedOut')

const onClick = () => {
  ;[viewLoggedIn, viewLoggedOut].forEach(toggleDnFlex)
}

export default {
  type: 'click',
  handle: onClick,
  triggers: [
    document.querySelector('#loggedIn .js-toggle'),
    document.querySelector('#loggedOut .js-toggle'),
  ],
}
