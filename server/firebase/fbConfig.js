import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//Firebase Config Info
const config = {
  apiKey: 'AIzaSyAcyea7PYEw47ofHl9LoBJsI_JxOeuqD-0',
  authDomain: 'algorhythms1904.firebaseapp.com',
  databaseURL: 'https://algorhythms1904.firebaseio.com',
  projectId: 'algorhythms1904',
  storageBucket: '',
  messagingSenderId: '280896883694',
  appId: '1:280896883694:web:fe124fca3984b608'
}

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/home',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
}

//Initialize firebase with config file
firebase.initializeApp(config)

//Initialize firestore
firebase.firestore()

export default firebase
