// Rooms reducer stores all currently used rooms, as well as their origina name,
// current name, members and associated text room
import { MEMBER_JOIN, MEMBER_LEFT, CREATE_ROOM, DELETE_ROOM } from '../actions/actions'
import { NEW_ROOM_NAME } from '../actions/pollTypes'

export default (state = {}, action) => {
  const newState = { ...state }

  switch (action.type) {
    case MEMBER_JOIN:
      newState[action.roomId].members += 1
      return newState

    case MEMBER_LEFT:
      newState[action.roomId].members -= 1
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
    
    case NEW_ROOM_NAME:
      newState[action.roomId].name = action.newName
      return newState

    default:
      return state
  }
}
