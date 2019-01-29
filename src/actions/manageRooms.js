import states from '../states/states'

export default (oldVC, newVC) => {
  if (oldVC !== undefined) decideAction(oldVC)
  if (newVC !== undefined) decideAction(newVC)
}

const decideAction = vc => {
  if (vc.members.size === 0) {
    // Empty room
  } else if (vc.members.size === 1) {
    // New room
    states.rooms.set(vc.id, {
      originalName: vc.name,
      name: vc.name,
      textRoom: createRoom(vc)
    })
  }
}

const createRoom = async vc => {
  // Create the permissions object
  const roomPermissions = [{
    id: vc.guild.id,
    denied: ['READ_MESSAGES', 'SEND_MESSAGES']
  }, {
    id: vc.guild.me.id,
    allowed: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'READ_MESSAGES', 'SEND_MESSAGES']
  }, {
    id: vc.members.keyArray()[0],
    allowed: ['READ_MESSAGES', 'SEND_MESSAGES']
  }]

  var channel = await vc.guild.createChannel(vc.name, 'text', roomPermissions)
  channel.setParent(states.category)

  return channel.id
}