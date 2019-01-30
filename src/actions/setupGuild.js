import states from '../states/states'
import permissionsNeeded from '../helpers/permissions'

// Checks if the bot has all the permissions it needs to function properly
export default (msg, permissions) => {
  if (!states.ready) {
    var missingPermissions = findMissingPermissions(permissions)
    console.log(missingPermissions.length)
    if (missingPermissions.length === 0) {
      msg.channel.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
      states.ready = true
    } else {
      const formatMissing = missingPermissions.reduce((prev, curr) => (
        `${prev}\n${curr}`
      ), '```') + '```'

      msg.channel.send(`Sup! It seems like I have a few permissions missing 😕, please allow me to access this permissions ${formatMissing}`)
    }
  } else {
    msg.channel.send('No need for that, it\'s all good 🎉')
  }
}

const findMissingPermissions = (permissions) => (
  permissionsNeeded.filter(perm => !permissions[perm])
)