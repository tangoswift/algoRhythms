import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
//Initialize firestore/firebase with Redux/Firebase
import {reduxFirestore, getFirestore, firestoreReducer} from 'redux-firestore'
import {
  reactReduxFirebase,
  getFirebase,
  firebaseReducer
} from 'react-redux-firebase'
import fbConfig from '../../server/firebase/fbConfig'
import auth from './auth'
import roomId from './roomId'
import user from './user'

const reducer = combineReducers({
  auth,
  roomId,
  user,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

const middleware = composeWithDevTools(
  //Add extra arguments to the Redux Store with access firestore/firebase
  applyMiddleware(
    thunkMiddleware.withExtraArgument({getFirestore, getFirebase}),
    createLogger({collapsed: true})
  ),
  //Connect firebase with Redux Store
  reduxFirestore(fbConfig),
  reactReduxFirebase(fbConfig, {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true
  })
)
const store = createStore(reducer, middleware)

export default store
