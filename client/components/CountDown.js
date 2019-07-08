import React, {Component} from 'react'
import {startProblemThunk} from '../store/roomId'

import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'

class Countdown extends Component {
  constructor() {
    super()
    this.tick = this.tick.bind(this)
    this.state = {seconds: -1, message: ''}
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  start = e => {
    e.preventDefault()
    const roomId = this.props.id
    this.props.startProblem(roomId)
  }

  tick() {
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
      if (this.state.seconds > 0 && this.state.seconds < 10) {
        this.setState({message: ` seconds to switch`})
        document.getElementById('timerMessage').style = 'color:red'
        document.getElementById('timer').style = 'color:red'
      }
      if (this.state.seconds === 0) {
        this.setState({seconds: 30})
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
    const {start} = this.props
    const {seconds, message} = this.state
    if (start && seconds === -1) {
      this.setState({
        seconds: 60
      })
      this.timer = setInterval(this.tick, 1000)
    }

    return (
      <React.Fragment>
        {!start ? (
          <button type="submit" onClick={this.start}>
            Start
          </button>
        ) : (
          <div style={{width: '100%', textAlign: 'center'}}>
            <span id="timer" fontSize="50">
              {seconds}
            </span>
            <span id="timerMessage" fontSize="50">
              {message}
            </span>
          </div>
        )}
      </React.Fragment>
    )
  }
}

// const mapState = state => ({
//   start: state.firebase.
// })

const mapDispatch = dispatch => ({
  startProblem: roomId => dispatch(startProblemThunk(roomId))
})

export default connect(null, mapDispatch)(Countdown)
