import states from '../states/states'
import pollTypes from '../helpers/pollTypes'

const newPoll = (type, msgReaction, extraInfo) => {
  switch (type) {
    case pollTypes.NEW_ROOM_NAME:
      states.polls.set(msgReaction.message.id, {
        // Extra Info: [ VOICE_ROOM_ID, NUMBER_MEMBERS ]
        emoteId: msgReaction._emoji.id,
        voiceRoom: extraInfo[0],
        votes: 0,
        votesNeeded: extraInfo[1]
      })
      console.log(states.polls)
      break
    default:
      break
  }
}

export default { newPoll }