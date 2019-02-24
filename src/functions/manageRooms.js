import { memberJoin, memberLeft, createRoom, deleteRoom } from '../actions/actions'
import store from '../reducers/store'

export default async (oldVC, newVC) => {
  if (oldVC !== undefined) {
    // The user left the room, and it might be empty now
    if (oldVC.members.size !== 0) {
      memberLeft(oldVC.id)
    } else {
      removeRoom(oldVC)
    }
  }
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

const removeRoom = vc => {
  var textRoom = store.getState().rooms[vc.id].textRoom
  vc.guild.channels.get(textRoom).delete()
    .catch(console.error)
  deleteRoom(vc.id)
}