import store from '../reducers/store'
import { addVote, removeVote } from '../actions/actions'

const newReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    // It's a poll
    addVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

const removeReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    // It's a poll
    removeVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

export default { newReaction, removeReaction }