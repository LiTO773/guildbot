import store from '../reducers/store'
import { roomNameChangePoll } from '../actions/actions'

const createRoomNameChangePoll = async msg => {
  const room = await confirmRoom(msg) // gets the voice room (useful for the state.rooms)
  if (room) { // The message came from a voice text room
    var content = msg.content.split(' ')
    if (content.length <= 1) {
      msg.channel.send('Please specify the new room name, like this: `\\changename <new name>`')
      return
    }
    console.log(room)
    // Get new room name
    content.shift()
    const tempName = content.reduce((prev, curr) => `${prev} ${curr}`)
    msg.channel.send(`@here, <@${msg.author.id}> wants to change the room name to \`${tempName}\`
    Does this sound like a good idea (👍)?`)
      .then(sent => sent.react('👍'))
      .then(reaction => roomNameChangePoll(reaction.message.id, room.members / 2, msg.channel.id, room.id))
  } else {
    msg.channel.send('You have to be in a voice channel to do that')
  }
}

// Confirms the message was from a voice text room
const confirmRoom = msg => {
  return new Promise((resolve, reject) => {
    var roomsState = store.getState().rooms
    for (const key in roomsState) {
      if (roomsState[key].textRoom === msg.channel.id) {
        roomsState[key].id = key
        resolve(roomsState[key])
      }
    }
    resolve(null)
  })
}

export default { createRoomNameChangePoll }
