import { correctPermissions, incorrectPermissions } from '../actions/actions'
import permissionsNeeded from '../helpers/permissions'

// Checks if the bot has all the permissions it needs to function properly
export default (owner, permissions, firstTime) => {
  var missingPermissions = findMissingPermissions(permissions)
  if (missingPermissions.length === 0) {
    correctPermissions()
    if (firstTime) owner.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
  } else {
    incorrectPermissions()
    const formatMissing = missingPermissions.reduce((prev, curr) => (
      `${prev}\n${curr}`
    ), '```') + '```'

    owner.send(`Sup! It seems like I have a few permissions missing 😕, please allow me to access this permissions ${formatMissing}`)
  }
}

const findMissingPermissions = (permissions) => (
  permissionsNeeded.filter(perm => !permissions[perm])
)
