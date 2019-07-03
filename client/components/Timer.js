const React = require('react')
const ms = require('pretty-ms')
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      start: 0,

      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,

      isOn: true
    })
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    )
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0})
  }

  render() {
    let start =
      this.state.time === 0 ? (
        <Button variant="contained" color="secondary" onClick={this.startTimer}>
          start
        </Button>
      ) : null
    let stop = this.state.isOn ? (
      <Button variant="contained" color="secondary" onClick={this.stopTimer}>
        stop
      </Button>
    ) : null
    let reset =
      this.state.time !== 0 && !this.state.isOn ? (
        <Button variant="contained" color="secondary" onClick={this.resetTimer}>
          reset
        </Button>
      ) : null
    let resume =
      this.state.time !== 0 && !this.state.isOn ? (
        <Button variant="contained" color="secondary" onClick={this.startTimer}>
          resume
        </Button>
      ) : null
    return (
      <div>
        <Typography component="h2" variant="h5">
          Timer: {ms(this.state.time)}
        </Typography>

        {start}
        {resume}
        {stop}
        {reset}
      </div>
    )
  }
}
export default Timer
