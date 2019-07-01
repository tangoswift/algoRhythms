/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'
const GET_ROOMS = 'GET_ROOMS'

/**
 * INITIAL STATE
 */
const defaultRoomId = ''

/**
 * ACTION CREATORS
 */
const addRoom = roomId => ({type: ADD_ROOM, roomId})
const getRooms = rooms => ({type: GET_ROOMS, rooms})

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
    const res = await firestore.collection('rooms').add(roomInfo)

    dispatch(addRoom(res.id))
  } catch (err) {
    console.log(err)
  }
}

// export const getRoomsThunk = () => async (
//   dispatch,
//   getState,
//   {getFirestore}
// ) => {
//   try {
//     const firestore = getFirestore()
//     const res = await firestore.collection('rooms').get()
//     dispatch(getRooms(res.firestore.data.rooms))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultRoomId, action) {
  switch (action.type) {
    case ADD_ROOM:
      return action.roomId
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
