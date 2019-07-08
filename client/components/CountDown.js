import React, {Component} from 'react'

import Typography from '@material-ui/core/Typography'

export default class Countdown extends Component {
  constructor() {
    super()
    this.tick = this.tick.bind(this)
    this.state = {seconds: 12, message: ''}
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
        <text id="timer" fontSize="50">
          {this.state.seconds}
        </text>
        <text id="timerMessage" fontSize="50">
          {this.state.message}
        </text>
      </div>
    )
  }
}
