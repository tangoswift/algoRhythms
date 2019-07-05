import React, {Component} from 'react'

import Typography from '@material-ui/core/Typography'

export default class Countdown extends Component {
  constructor() {
    super()
    this.tick = this.tick.bind(this)
    this.state = {seconds: 30, message: ''}
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  tick() {
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
      if (this.state.seconds > 0 && this.state.seconds < 10)
        this.setState({message: `seconds to switch`})
    } else {
      this.setState({message: ''})
      this.setState({seconds: 30})
    }
  }
  render() {
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
        <Typography component="h2" variant="h5">
          {this.state.seconds}
        </Typography>
        <Typography component="h1" variant="h5">
          {this.state.message}
        </Typography>
      </div>
    )
  }
}
