import setupGuild from './setupGuild'
import manageRooms from './manageRooms'
import editRooms from './editRooms'

export default {
  setupGuild,
  manageRooms,
  roomPool: editRooms.roomPoll
}
