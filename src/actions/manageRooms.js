export default (oldVC, newVC) => {
  if (oldVC !== undefined) decideAction(oldVC)
  if (newVC !== undefined) decideAction(newVC)
}

const decideAction = vc => {
  if (vc.members.size === 0) {
    console.log('Empty room!')
  } else if (vc.members.size === 1) {
    console.log('New room!')
  }
}