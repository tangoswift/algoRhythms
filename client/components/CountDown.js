import React, {Component} from 'react'
import {startProblemThunk} from '../store/roomId'
import {setRoleAsDriverThunk, setRoleAsNavigatorThunk} from '../store/user'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({})

class Countdown extends Component {
  constructor() {
    super()
    this.state = {seconds: -1, message: ''}
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  start = e => {
    e.preventDefault()
    const roomId = this.props.roomId
    this.props.startProblem(roomId)
  }

  tick = () => {
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
      if (this.state.seconds > 0 && this.state.seconds < 10) {
        this.setState({message: ` seconds to switch`})
        document.getElementById('timerMessage').style = 'color:red'
        document.getElementById('timer').style = 'color:red'
      }
      //Reverse the role when timer hits zero
      if (this.state.seconds === 0) {
        if (this.props.role == 'navigator') {
          this.props.setDriver(this.props.roomId, this.props.auth.uid)
        } else {
          this.props.setNavigator(this.props.roomId, this.props.auth.uid)
        }
        this.setState({seconds: 300})
        this.setState({message: ''})
        document.getElementById('timer').style = 'color:white'
        document.getElementById('timerMessage').style = 'color:white'
      }
    }
  }

  render() {
    /**
     * Start the tick once someone in the room hits start
     */
    const {classes, start} = this.props
    const {seconds, message} = this.state
    if (start && seconds === -1) {
      this.setState({
        seconds: 300
      })
      this.timer = setInterval(this.tick, 1000)
    }
    return (
      <React.Fragment>
        {start ? (
          <div>
            <span id="timer" fontSize="50">
              {seconds}
            </span>
            <span id="timerMessage" fontSize="50">
              {message}
            </span>
          </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={this.start}
          >
            Start
          </Button>
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  auth: state.firebase.auth
})

const mapDispatch = dispatch => ({
  startProblem: roomId => dispatch(startProblemThunk(roomId)),
  setDriver: (roomId, userId) => dispatch(setRoleAsDriverThunk(roomId, userId)),
  setNavigator: (roomId, userId) =>
    dispatch(setRoleAsNavigatorThunk(roomId, userId))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Countdown))
