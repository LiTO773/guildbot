import { memberJoin, memberLeft, createRoom, deleteRoom } from '../actions/actions'

export default async (oldVC, newVC) => {
  if (oldVC !== undefined) {
    // The user left the room, and it might be empty now
    console.log(oldVC.members.size)
    if (oldVC.members.size !== 0) {
      memberLeft(oldVC.id)
    } else {
      deleteRoom(oldVC.id)
    }
  }
  console.log(newVC.members.size)
  if (newVC !== undefined) {
    // The user joined a room, or joined an empty room
    if (newVC.members.size !== 1) {
      // Ele nem elimina as salas
      memberJoin(newVC.id)
    } else {
      createRoom(newVC.id, newVC.name, await createTextRoom(newVC))
    }
  }
}

// const decideAction = async vc => {
//   if (oldVC !==)
//   console.log(vc.members.size)
//   if (vc.members.size === 0) {
//     // Empty room
//     // deleteRoom(vc)
//   } else if (vc.members.size === 1) {
//     console.log('gucci')
//     createRoom(vc.id, vc.name, await createTextRoom(vc))
//   } else {
//     // Joined another room
//     states.rooms.set(vc.id, {
//       ...states.rooms.get(vc.id),
//       memberCount: vc.members.size
//     })
//   }
//   console.log(states.rooms)
// }

const createTextRoom = async vc => {
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

  const channel = await vc.guild.createChannel('🔘' + vc.name, 'text', roomPermissions)

  return channel.id
}

// const deleteRoom = vc => {
//   var room = states.rooms.get(vc.id)
//   vc.guild.channels.get(room.textRoom).delete()
//     .catch(console.error)
//   states.rooms.delete(vc.id)
// }