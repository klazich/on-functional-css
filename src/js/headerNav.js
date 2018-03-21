/**
 * Toggling header nav views: Logged in & Logged out
 */
import { toggleDnFlex } from './helpers'

/***** Elements ********************************/

const
  viewLoggedIn = document.querySelector('#loggedIn'),
  viewLoggedOut = document.querySelector('#loggedOut'),
  logInBttn = viewLoggedOut.querySelector('.js-toggle'),
  logOutBttn = viewLoggedIn.querySelector('.js-toggle');

/***** Handle **********************************/

const onClick = () => {
  [viewLoggedIn, viewLoggedOut].forEach(toggleDnFlex)
}

/***** Export **********************************/

export default {
  type: 'click',
  handle: onClick,
  triggers: [logInBttn, logOutBttn]
}
