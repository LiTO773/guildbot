// Ready reducer controls if the bot has proper permissions to work
// If not, none of the commands will run
import { CORRECT_PERMISSIONS, INCORRECT_PERMISSIONS } from '../actions/actions'

export default (state = { ready: false }, action) => {
  switch (action.type) {
    case CORRECT_PERMISSIONS:
      return { ready: true }
    case INCORRECT_PERMISSIONS:
      return { ready: false }
    default:
      return state
  }
}