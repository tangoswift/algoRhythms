/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'
const GET_ROOMS = 'GET_ROOMS'
const CHANGE_CODE = 'CHANGE_CODE'
const UPDATE_RESULT = 'UPDATE_RESULT'
const UPDATE_VISIBILITY = 'UPDATE_VISIBILITY'
const START_PROBLEM = 'START_PROBLEM'

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
const startProblem = () => ({type: START_PROBLEM})

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
      code: roomInfo.code,
      result: [],
      visible: true,
      points: roomInfo.points,
      start: false,
      timestamp: new Date()
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
    let visibility = result.every(res => res.match('false'))
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
export const updateVisibilityThunk = roomId => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const users = []

    await firestore
      .collection('rooms')
      .doc(roomId)
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          users.push(doc.id)
        })
      })

    await firestore
      .collection('rooms')
      .doc(roomId)
      .update({
        visible: users.length < 2
      })
    dispatch(updateVisibility())
  } catch (error) {
    console.error('TCL: updateVisibilityThunk -> error', error)
  }
}

export const startProblemThunk = roomId => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()

    await firestore
      .collection('rooms')
      .doc(roomId)
      .update({start: true})

    dispatch(startProblem())
  } catch (error) {
    console.log(error)
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
    case START_PROBLEM:
      return state
    default:
      return state
  }
}
