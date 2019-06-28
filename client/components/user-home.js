import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <h3>Welcome, User Home</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(UserHome)
