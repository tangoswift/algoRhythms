/**
 * ACTION TYPES
 */
const ROOM_TO_USER = 'ROOM_TO_USER'
const GET_ROOM_HISTORY = 'GET_ROOM_HISTORY'
const SET_ROLE_AS_DRIVER = 'SET_ROLE_AS_DRIVER'
const SET_ROLE_AS_NAVIGATOR = 'SET_ROLE_AS_NAVIGATOR'

/**
 * INITIAL STATE
 */
const defaultRoomId = {}

/**
 * ACTION CREATORS
 */
const roomToUser = () => ({
  type: ROOM_TO_USER
})
const getRoomHistory = rooms => ({
  type: GET_ROOM_HISTORY,
  rooms
})
const setRoleAsDriver = () => ({
  type: SET_ROLE_AS_DRIVER,
  role: 'driver'
})
const setRoleAsNavigator = () => ({
  type: SET_ROLE_AS_NAVIGATOR,
  role: 'navigator'
})

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

export const getRoomHistoryThunk = userId => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()
    let collections = []
    let roomHistory = []

    await firestore
      .collection('users')
      .doc(userId)
      .collection('rooms')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          collections.push(doc.id)
        })
      })

    /**********************************
     * THE FOLLOWING CODE WILL NOT WORK
     **********************************/
    // collections.forEach(async roomId => {
    //   const doc = await firestore
    //     .collection('rooms')
    //     .doc(roomId)
    //     .get()
    //   roomHistory.push(doc.data())
    // })

    /**********************************
     * USE THE CODE BELOW INSTEAD
     **********************************/
    for (let i = 0; i < collections.length; i++) {
      const roomId = collections[i]
      const doc = await firestore
        .collection('rooms')
        .doc(roomId)
        .get()
      const id = doc.id
      roomHistory.push({...doc.data(), id: id})
    }

    dispatch(getRoomHistory(roomHistory))
  } catch (err) {
    console.log(err)
  }
}

export const setRoleAsDriverThunk = (rooomId, userId) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()

    await firestore
      .collection('users')
      .doc(userId)
      .update({role: 'driver'})

    dispatch(setRoleAsDriver())
  } catch (error) {
    console.log(error)
  }
}

export const setRoleAsNavigatorThunk = (rooomId, userId) => async (
  dispatch,
  getState,
  {getFirestore}
) => {
  try {
    const firestore = getFirestore()

    await firestore
      .collection('users')
      .doc(userId)
      .update({role: 'navigator'})
    dispatch(setRoleAsNavigator())
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultRoomId, action) {
  switch (action.type) {
    case ROOM_TO_USER:
      return state
    case GET_ROOM_HISTORY:
      return {...state, roomHistory: action.rooms}
    case SET_ROLE_AS_DRIVER:
      return {...state, role: action.role}
    case SET_ROLE_AS_NAVIGATOR:
      return {...state, role: action.role}
    default:
      return state
  }
}
