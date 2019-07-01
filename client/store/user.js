/**
 * ACTION TYPES
 */
const ROOM_TO_USER = 'ROOM_TO_USER'

/**
 * INITIAL STATE
 */
const defaultRoomId = ''

/**
 * ACTION CREATORS
 */
const roomToUser = () => ({type: 'ROOM_TO_USER', roomId})

/**
 * THUNK CREATORS
 */
export const roomToUserThunk = (roomId, userId) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore
      .collection('users')
      .doc(userId)
      .collection('rooms')
      .doc(roomId)
      .set({timestamps: new Date()})
    dispatch(roomToUser())
    console.log('Added roomId to user collection')
  } catch (err) {
    console.log(err)
  }
}

export default function(state = defaultRoomId, action) {
  switch (action.type) {
    case 'ROOM_TO_USER':
      return state
    default:
      return state
  }
}
