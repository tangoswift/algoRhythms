import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signOutThunk} from '../store/auth'

const Navbar = ({auth, signOut}) => (
  <div>
    <h1>algoRhythms</h1>
    <nav>
      {auth.uid ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/profile">My Profile</Link>
          <a href="#" onClick={signOut}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatch = dispatch => {
  return {
    signOut: () => dispatch(signOutThunk())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
