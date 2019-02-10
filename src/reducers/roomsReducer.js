// Rooms reducer stores all currently used rooms, as well as their origina name,
// current name, members and associated text room
import { MEMBER_SWAP, CREATE_ROOM, DELETE_ROOM } from '../actions/actions'

export default (state = {}, action) => {
  const newState = { ...state }

  switch (action.type) {
    case MEMBER_SWAP:
      newState[action.oldRoomId].members -= 1
      newState[action.newRoomId].members += 1
      return newState

    case DELETE_ROOM:
      delete newState[action.roomId]
      return newState

    case CREATE_ROOM:
      newState[action.roomId] = {
        originalName: action.name,
        name: action.name,
        members: 1,
        textRoom: action.textRoom
      }
      return newState

    default:
      return state
  }
}
