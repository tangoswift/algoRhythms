import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
//Initialize firestore/firebase with Redux/Firebase
import {reduxFirestore, getFirestore, firestoreReducer} from 'redux-firestore'
import {
  reactReduxFirebase,
  getFirebase,
  firebaseReducer
} from 'react-redux-firebase'
import fbConfig from '../../server/firebase/fbConfig'

const reducer = combineReducers({
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
  reactReduxFirebase(fbConfig)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
