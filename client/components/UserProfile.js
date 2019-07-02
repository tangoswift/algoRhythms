import React, {Component} from 'react'
import ProblemsSolved from './ProblemsSolved'
import {UserInfo} from '.'
import {getRoomHistoryThunk} from '../store/user'
import {connect} from 'react-redux'
import {id} from 'brace/worker/javascript'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getRooms(this.props.userId)
  }

  render() {
    const {roomHistory} = this.props
    return (
      <div>
        <h1>Problems Solved</h1>
        {roomHistory && roomHistory.length ? (
          <ProblemsSolved roomHistory={this.props.roomHistory} />
        ) : (
          'No problems completed'
        )}
        <h1>Total Points</h1>
        <UserInfo />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    roomHistory: state.user.roomHistory,
    userId: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: userId => dispatch(getRoomHistoryThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

/* eslint-disable no-script-url */
