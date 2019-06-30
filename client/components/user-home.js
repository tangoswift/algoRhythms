import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <h3>Welcome, {props.profile.firstName}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    profile: state.firebase.profile
  }
}

export default connect(mapState)(UserHome)
