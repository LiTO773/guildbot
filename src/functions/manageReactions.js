import store from '../reducers/store'
import { addVote, removeVote } from '../actions/actions'

const newReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    addVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

const removeReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    removeVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

export default { newReaction, removeReaction }