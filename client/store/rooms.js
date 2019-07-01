/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'
const GET_ROOMS = 'GET_ROOMS'

/**
 * INITIAL STATE
 */
const defaultRoom = {}

/**
 * ACTION CREATORS
 */
const addRoom = room => ({type: ADD_ROOM, room})
const getRooms = rooms => ({type: GET_ROOMS, rooms})

/**
 * THUNK CREATORS
 */

export const getRoomsThunk = () => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore.collection('rooms').get()
    console.log('lslslslsls', res.firestore.data)
    dispatch(getRooms(res.firestore.data.rooms))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultRoom, action) {
  switch (action.type) {
    case ADD_ROOM:
      return action.room
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
