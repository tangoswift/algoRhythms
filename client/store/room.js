import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ROOM = 'ADD_ROOM'

/**
 * INITIAL STATE
 */
const defaultRoom = {}

/**
 * ACTION CREATORS
 */
const addRoom = room => ({type: ADD_ROOM, room})

/**
 * THUNK CREATORS
 */
export const addRoomThunk = () => async (
  dispatch,
  getState,
  {getFirebase, getFirestore}
) => {
  try {
    const firestore = getFirestore()
    const res = await firestore.collection('rooms').add({
      roomNum: '1',
      name: 'test1'
    })
    console.log('add me room thunk')
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
    default:
      return state
  }
}
