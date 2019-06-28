import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, /* Signup, */ UserHome} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        {/* <Route path="/signup" component={Signup} /> */}
        {/* {isLoggedIn && ( */}
        {/* <Switch> */}
        {/* Routes placed here are only available after logging in */}
        {/* <Route path="/home" component={UserHome} /> */}
        {/* </Switch> */}
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes))
