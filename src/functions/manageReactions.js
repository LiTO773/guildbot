import store from '../reducers/store'
import { addVote } from '../actions/actions'

const newReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    // It's a poll
    addVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

export default { newReaction }