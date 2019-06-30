import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, SignUp, UserHome, Room} from './components/index'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    const {auth} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* {auth.uid && ( */}
        //{' '}
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
          <Route path="/room/:id" component={Room} />
          //{' '}
        </Switch>
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    auth: state.firebase.auth
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes))
