import states from '../states/states'
import permissionsNeeded from '../helpers/permissions'

// Checks if the bot has all the permissions it needs to function properly
export default (channel, permissions, firstTime) => {
  var missingPermissions = findMissingPermissions(permissions)
  if (missingPermissions.length === 0) {
    if (firstTime) channel.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
    states.ready = true
  } else {
    const formatMissing = missingPermissions.reduce((prev, curr) => (
      `${prev}\n${curr}`
    ), '```') + '```'

    channel.send(`Sup! It seems like I have a few permissions missing 😕, please allow me to access this permissions ${formatMissing}`)
  }
}

const findMissingPermissions = (permissions) => (
  permissionsNeeded.filter(perm => !permissions[perm])
)