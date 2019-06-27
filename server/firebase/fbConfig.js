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

//Initialize firebase with config file
firebase.initializeApp(config)

//Initialize firestore
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase
