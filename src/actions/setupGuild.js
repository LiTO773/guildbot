import permissionsNeeded from '../helpers/permissions'

// Checks if the bot has all the permissions it needs to function properly
export default (msg, permissions) => {

  var missingPermissions = findMissingPermissions(permissions)

  if (missingPermissions.length === 0) {
    msg.channel.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
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