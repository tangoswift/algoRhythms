/**
 * ACTION TYPE
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

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
  } catch (error) {
    console.error('TCL: signOutThunk -> error', error)
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
      return {...state, authError: action.err}
    case SIGN_OUT_SUCCESS:
      return {...state, authError: null}
    default:
      return state
  }
}
