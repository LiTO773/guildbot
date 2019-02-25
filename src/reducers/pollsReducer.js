// Polls reducer controls all polls, including the type, current votes and
// votes needed

import { CREATE_POLL, ADD_VOTE, REMOVE_VOTE, DELETE_POLL } from '../actions/actions'

export default (state = {}, action) => {
  const newState = { ...state }

  switch (action.type) {
    case CREATE_POLL:
      newState[action.messageId] = {
        votes: {
          [action.emoteId]: 0
        },
        pollType: action.pollType,
        votesNeeded: {
          [action.emoteId]: action.votesNeeded
        }
      }
      return newState
    case ADD_VOTE:
      newState[action.messageId].votes[action.emoteId] += 1
      return newState
    case REMOVE_VOTE:
      newState[action.messageId].votes[action.emoteId] -= 1
      return newState
    case DELETE_POLL:
      delete newState[action.messageId]
      return newState
    default:
      return state
  }
}
