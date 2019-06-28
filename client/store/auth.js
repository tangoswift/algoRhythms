/**
 * ACTION TYPE
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SIGN_UP_FAIL = 'SIGN_UP_FAIL'

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
    console.error('TCL: err', err)
    dispatch(loginFail(err))
  }
}

export const signOutThunk = () => async (dispatch, getState, {getFirebase}) => {
  try {
    const firebase = getFirebase()
    await firebase.auth().signOut()
    dispatch(signOutSuccess())
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
    console.log(newUser, 'new user')
    await firestore
      .collection('users')
      .doc(newUser.user.uid)
      .set({
        firstName: user.firstName,
        lastName: user.lastName
      })
    dispatch(signUpSuccess())
  } catch (err) {
    console.log('TCL: signUpThunk -> error', err)
    dispatch(signUpFail(err))
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
    default:
      return state
  }
}
