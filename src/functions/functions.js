import setupGuild from './permissionsChecker'
import manageRooms from './manageRooms'
import editRooms from './editRooms'

export default {
  setupGuild,
  manageRooms,
  createRoomPoll: editRooms.createRoomPoll
}
