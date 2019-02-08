import states from '../states/states'

const roomPoll = async msg => {
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
    Does this seem like a good idea (👍)?`)
      .then(sent => sent.react('👍'))
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

export default { roomPoll }
