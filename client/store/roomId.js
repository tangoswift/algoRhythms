/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'
const GET_ROOMS = 'GET_ROOMS'
const CHANGE_CODE = 'CHANGE_CODE'
const UPDATE_RESULT = 'UPDATE_RESULT'

/**
 * INITIAL STATE
 */
const defaultRoomId = ''

/**
 * ACTION CREATORS
 */
const addRoom = roomId => ({type: ADD_ROOM, roomId})
const getRooms = rooms => ({type: GET_ROOMS, rooms})
const changeCode = () => ({type: CHANGE_CODE})
const updateResult = () => ({type: UPDATE_RESULT})

/**
 * THUNK CREATORS
 */
export const addRoomThunk = roomInfo => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore.collection('rooms').add({
      name: roomInfo.name,
      instructions: roomInfo.instructions,
      code: roomInfo.instructions,
      result: 'waiting...'
    })
    dispatch(addRoom(res.id))
  } catch (err) {
    console.log(err)
  }
}

export const changeCodeThunk = (roomId, code) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore
      .collection('rooms')
      .doc(roomId)
      .update({
        code: code
      })
    dispatch(changeCode())
  } catch (error) {
    console.error('TCL: changeCodeThunk -> error', error)
  }
}

export const updateResultThunk = (roomId, result) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore
      .collection('rooms')
      .doc(roomId)
      .update({
        result: result
      })
    dispatch(updateResult())
  } catch (error) {
    console.error('TCL: updateResultThunk -> error', error)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultRoomId, action) {
  switch (action.type) {
    case ADD_ROOM:
      return action.roomId
    case CHANGE_CODE:
      return state
    case UPDATE_RESULT:
      return state
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
