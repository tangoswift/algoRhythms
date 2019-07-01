import React from 'react'
import {connect} from 'react-redux'
import {getRoomsThunk} from '../store/rooms'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {rooms} = props

  let roomKeys = null
  if (rooms) {
    roomKeys = Object.keys(rooms)
  }
  return (
    <div>
      <h3>
        Welcome, {props.profile.firstName} {props.profile.lastName}
      </h3>
      <ul>
        Available rooms:
        {rooms ? (
          roomKeys.map(roomName => (
            <li key={roomName}>
              <Link to={`/rooms/${rooms[roomName].name}/${roomName}`}>
                {rooms[roomName].name}
              </Link>
              <a>{rooms[roomName].instructions}</a>
            </li>
          ))
        ) : (
          <h5>loading</h5>
        )}
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    rooms: state.firestore.data.rooms
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: 'rooms'}])
)(UserHome)
