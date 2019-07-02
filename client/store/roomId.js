/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'
const GET_ROOMS = 'GET_ROOMS'
const CHANGE_CODE = 'CHANGE_CODE'
const UPDATE_RESULT = 'UPDATE_RESULT'
const UPDATE_VISIBILITY = 'UPDATE_VISIBILITY'

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
const updateVisibility = () => ({type: UPDATE_VISIBILITY})

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
      result: 'waiting...',
      visible: true
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
    let visibility = result !== 'Thats right!'
    const firestore = getFirestore()
    const res = await firestore
      .collection('rooms')
      .doc(roomId)
      .update({
        result: result,
        visible: visibility
      })
    dispatch(updateResult())
  } catch (error) {
    console.error('TCL: updateResultThunk -> error', error)
  }
}
export const updateVisibilityThunk = (roomId, visibility) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    console.log(roomId, visibility)
    const firestore = getFirestore()
    const res = await firestore
      .collection('rooms')
      .doc(roomId)
      .update({
        visible: visibility
      })
    dispatch(updateVisibility())
  } catch (error) {
    console.error('TCL: updateVisibilityThunk -> error', error)
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
    case UPDATE_VISIBILITY:
      return state
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
