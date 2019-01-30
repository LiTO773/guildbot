import states from '../states/states'
import permissionsNeeded from '../helpers/permissions'

// Checks if the bot has all the permissions it needs to function properly
export default (msg, permissions) => {
  var missingPermissions = findMissingPermissions(permissions)
  console.log(missingPermissions.length)
  if (missingPermissions.length === 0) {
    msg.channel.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
    setupRooms(msg)
  } else {
    const formatMissing = missingPermissions.reduce((prev, curr) => (
      `${prev}\n${curr}`
    ), '```') + '```'

    msg.channel.send(`Sup! It seems like I have a few permissions missing 😕, please allow me to access this permissions ${formatMissing}`)
  }
}

const findMissingPermissions = (permissions) => (
  permissionsNeeded.filter(perm => !permissions[perm])
)

const setupRooms = msg => {
  // Create the permissions object
  const roomPermissions = [{
    id: msg.guild.id,
    denied: ['READ_MESSAGES', 'SEND_MESSAGES']
  }, {
    id: msg.guild.me.id,
    allowed: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'READ_MESSAGES', 'SEND_MESSAGES']
  }]

  // Create category for text channels
  msg.guild.createChannel('Text Rooms', 'category', roomPermissions)
    .then(channel => {
      states.category = channel.id
    })
    .catch(err => {
      console.error(err)
      msg.channel.send('There was an error while setting up, please check the console for more details 😕')
    })
}