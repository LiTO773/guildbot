import states from '../states/states'

export default (oldVC, newVC) => {
  if (oldVC !== undefined) decideAction(oldVC)
  if (newVC !== undefined) decideAction(newVC)
}

const decideAction = async vc => {
  if (vc.members.size === 0) {
    // Empty room
    deleteRoom(vc)
  } else if (vc.members.size === 1) {
    // New room
    states.rooms.set(vc.id, {
      originalName: vc.name,
      name: vc.name,
      memberCount: 1,
      textRoom: await createRoom(vc)
    })
  } else {
    // Joined another room
    states.rooms.set(vc.id, {
      ...states.rooms.get(vc.id),
      memberCount: vc.members.size
    })
  }
  console.log(states.rooms)
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

  var channel = await vc.guild.createChannel('🔘' + vc.name, 'text', roomPermissions)
  channel.setParent(states.category)

  return channel.id
}

const deleteRoom = vc => {
  var room = states.rooms.get(vc.id)
  vc.guild.channels.get(room.textRoom).delete()
    .catch(console.error)
  states.rooms.delete(vc.id)
}