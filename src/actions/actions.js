import store from '../reducers/store'
import { NEW_ROOM_NAME } from './pollTypes'
// ready
export const CORRECT_PERMISSIONS = 'CORRECT_PERMISSIONS'
export const INCORRECT_PERMISSIONS = 'INCORRECT_PERMISSIONS'

// rooms
export const MEMBER_JOIN = 'MEMBER_JOIN'
export const MEMBER_LEFT = 'MEMBER_LEFT'
export const CREATE_ROOM = 'CREATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'

// polls
export const CREATE_POLL = 'CREATE_POLL'
export const ADD_VOTE = 'ADD_VOTE'
export const REMOVE_VOTE = 'REMOVE_VOTE'
export const DELETE_POLL = 'DELETE_POLL'

// functions
export const correctPermissions = () => store.dispatch({ type: CORRECT_PERMISSIONS })
export const incorrectPermissions = () => store.dispatch({ type: INCORRECT_PERMISSIONS })

export const memberJoin = roomId => store.dispatch({ type: MEMBER_JOIN, roomId })
export const memberLeft = roomId => store.dispatch({ type: MEMBER_LEFT, roomId })
export const createRoom = (roomId, name, textRoom) => store.dispatch({ type: CREATE_ROOM, roomId, name, textRoom })
export const deleteRoom = roomId => store.dispatch({ type: DELETE_ROOM, roomId })

export const roomNameChangePoll = (messageId, votesNeeded, textId, voiceId) => store.dispatch({ type: CREATE_POLL, messageId, emoteId: '👍', pollType: NEW_ROOM_NAME, votesNeeded, payload: { textId, voiceId } })
export const addVote = (messageId, emoteId) => store.dispatch({ type: ADD_VOTE, messageId, emoteId })
export const removeVote = (messageId, emoteId) => store.dispatch({ type: REMOVE_VOTE, messageId, emoteId })
export const deletePoll = messageId => store.dispatch({ type: DELETE_POLL, messageId })
