import store from '../reducers/store'
import addVotePoll from '../actions/addVotePoll'
import { removeVote } from '../actions/actions'

const newReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    addVotePoll(msgReaction.message.id, msgReaction.emoji.name)
  }
}

const removeReaction = msgReaction => {
  if (store.getState().polls[msgReaction.message.id] !== undefined) {
    removeVote(msgReaction.message.id, msgReaction.emoji.name)
  }
}

export default { newReaction, removeReaction }