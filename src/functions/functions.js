import setupGuild from './permissionsChecker'
import manageRooms from './manageRooms'
import editRooms from './editRooms'
import manageReactions from './manageReactions'

export default {
  setupGuild,
  manageRooms,
  createRoomNameChangePoll: editRooms.createRoomNameChangePoll,
  newReaction: manageReactions.newReaction,
  removeReaction: manageReactions.removeReaction
}
