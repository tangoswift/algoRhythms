import history from '../history'

/**
 * ACTION TYPE
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SIGN_UP_FAIL = 'SIGN_UP_FAIL'
const CLEAR_AUTH_MESSAGE = 'CLEAR_AUTH_MESSAGE'
const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL'

/**
 * INITIAL STATE
 */
const initialState = {authError: null}

/**
 * ACTION CREATOR
 */
const loginSuccess = () => ({type: LOGIN_SUCCESS})
const loginFail = err => ({type: LOGIN_FAIL, err})
const signOutSuccess = () => ({type: SIGN_OUT_SUCCESS})
const signUpSuccess = () => ({type: SIGN_UP_SUCCESS})
const signUpFail = err => ({type: SIGN_UP_FAIL, err})
const profileUpdateFail = () => ({type: UPDATE_USER_PROFILE_FAIL})
const profileUpdateSuccess = () => ({type: UPDATE_USER_PROFILE})
const clearAuthMessage = () => ({type: CLEAR_AUTH_MESSAGE})

/**
 * THUNK CREATOR
 */
export const signInThunk = credentials => async (
  dispatch,
  getState,
  {getFirebase}
) => {
  try {
    const firebase = getFirebase()
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
    dispatch(loginSuccess())
  } catch (err) {
    dispatch(loginFail(err))
  }
}

export const signOutThunk = () => async (dispatch, getState, {getFirebase}) => {
  try {
    const firebase = getFirebase()
    await firebase.auth().signOut()
    await firebase.logout()

    dispatch(signOutSuccess())
    history.push('/')
  } catch (err) {
    console.error('TCL: signOutThunk -> error', err)
  }
}

export const signUpThunk = user => async (
  dispatch,
  getState,
  {getFirebase, getFirestore}
) => {
  try {
    const firebase = getFirebase()
    const firestore = getFirestore()

    const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
    await firestore
      .collection('users')
      .doc(newUser.user.uid)
      .set({
        firstName: user.firstName,
        lastName: user.lastName
      })
    dispatch(signUpSuccess())
    //Redirect to home after successful sign up
    history.push('/home')
  } catch (err) {
    dispatch(signUpFail(err))
  }
}

export const updateProfileThunk = user => async (
  dispatch,
  getState,
  {getFirebase, getFirestore}
) => {
  try {
    const firestore = getFirestore()

    await firestore
      .collection('users')
      .doc(user.id)
      .set({
        firstName: user.firstName,
        lastName: user.lastName
      })
    dispatch(profileUpdateSuccess())
    //Redirect to home after successful sign up
    history.push('/home')
  } catch (err) {
    dispatch(profileUpdateFail(err))
  }
}

export const clearAuthMessageThunk = () => async dispatch => {
  try {
    dispatch(clearAuthMessage())
  } catch (error) {
    console.log('TCL: clearAuthMessageThunk -> error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, authError: null}
    case LOGIN_FAIL:
      return {...state, authError: action.err.message}
    case SIGN_OUT_SUCCESS:
      return {...state, authError: null}
    case SIGN_UP_SUCCESS:
      return {...state, authError: null}
    case SIGN_UP_FAIL:
      return {...state, authError: action.err.message}
    case UPDATE_USER_PROFILE:
      return {...state, authError: null}
    case UPDATE_USER_PROFILE_FAIL:
      return {...state, authError: action.err.message}
    case CLEAR_AUTH_MESSAGE:
      return initialState
    default:
      return state
  }
}
