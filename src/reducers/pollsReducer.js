// Polls reducer controls all polls, including the type, current votes and
// votes needed

import { CREATE_POLL, ADD_VOTE, REMOVE_VOTE, DELETE_POLL } from '../actions/actions'

export default (state = {}, action) => {
  const newState = { ...state }
  var emotePos

  switch (action.type) {
    case CREATE_POLL:
      newState[action.messageId] = {
        emotes: [action.emoteId],
        pollType: action.pollType,
        votes: [0],
        votesNeeded: action.votesNeeded
      }
      return newState
    case ADD_VOTE:
      emotePos = findEmote(action.emoteId, newState[action.messageId].emotes)
      newState[action.messageId].votes[emotePos] += 1
      return newState
    case REMOVE_VOTE:
      emotePos = findEmote(action.emoteId, newState[action.messageId].emotes)
      newState[action.messageId].votes[emotePos] -= 1
      return newState
    case DELETE_POLL:
      delete newState[action.messageId]
      return newState
    default:
      return state
  }
}

const findEmote = (emote, arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === emote) return i
  }
  return -1
}