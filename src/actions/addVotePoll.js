import { addVote, changeRoomName, deletePoll } from '../actions/actions'
import { NEW_ROOM_NAME } from '../actions/pollTypes'
import store from '../reducers/store'

// Serves as a middleman beforing adding a vote
// Checks if the poll reaches it's goal and reacts accordingly to it's type
export default (pollId, emoteId) => {
  addVote(pollId, emoteId)
  const poll = store.getState().polls[pollId]
  if (poll.votes + 1 >= poll.votesNeeded) {
    // Poll finished
    if (poll.pollType === NEW_ROOM_NAME) {
      newRoomName(poll)
      deletePoll(pollId)
    }
  }
}

const newRoomName = poll => {
  const roomId = poll.payload.roomId
  const textId = poll.payload.textId
  const newName = poll.payload.newName
  changeRoomName(roomId, newName)
}