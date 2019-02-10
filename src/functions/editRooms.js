import states from '../states/states'
import pollTypes from '../helpers/pollTypes'
import polls from './polls'

const createRoomPoll = async msg => {
  const room = await confirmRoom(msg) // gets the voice room id (useful for the state.rooms)
  if (room) { // The message came from a voice text room
    var content = msg.content.split(' ')
    if (content.length <= 1) {
      msg.channel.send('Please specify the new room name, like this: `\\changename <new name>`')
      return
    }
    // Get new room name
    content.shift()
    const tempName = content.reduce((prev, curr) => `${prev} ${curr}`)
    msg.channel.send(`@here, <@${msg.author.id}> wants to change the room name to \`${tempName}\`
    Does this sound like a good idea (👍)?`)
      .then(sent => sent.react('👍'))
      .then(reaction => polls.newPoll(pollTypes.NEW_ROOM_NAME, reaction, [room, states.rooms.get(room).memberCount]))
  } else {
    msg.channel.send('You have to be in a voice channel to do that')
  }
}

// Confirms the message was from a voice text room
const confirmRoom = msg => {
  return new Promise((resolve, reject) => {
    states.rooms.forEach((val, key) => {
      if (val.textRoom === msg.channel.id) {
        resolve(key)
      }
    })
    resolve(null)
  })
}

export default { createRoomPoll }
