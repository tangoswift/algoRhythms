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
const roomToUser = () => ({type: 'ROOM_TO_USER'})

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
    await firestore
      .collection('users')
      .doc(userId)
      .collection('rooms')
      .doc(roomId)
      .set({timestamps: new Date()})

    await firestore
      .collection('rooms')
      .doc(roomId)
      .collection('users')
      .doc(userId)
      .set({timestamp: new Date()})

    dispatch(roomToUser())
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
