import React from 'react'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

export class JoinSpecificRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joinError: ''
    }
  }

  handleJoinRoom = async e => {
    e.preventDefault()
    const {firestore} = this.props
    const roomId = e.target.roomId.value
    const room = await firestore
      .collection('rooms')
      .doc(roomId)
      .get()

    /**
     * Check if Room exist, if not display error message, else
     * invoke handleListItemClick/Join Room
     */
    if (room.exists) {
      this.props.handleListItemClick(e, roomId)
      this.setState({
        joinError: ''
      })
    } else {
      this.setState({
        joinError: 'Invalid Room ID!'
      })
    }
  }

  render() {
    const {classes} = this.props.classes

    const {joinError} = this.state
    return (
      <Card className={classes.blue}>
        <Grid justify="space-between" container spacing={24}>
          <Grid item>
            <form onSubmit={this.handleJoinRoom}>
              <TextField
                label="Enter Room ID"
                name="roomId"
                id="mui-theme-provider-outlined-input"
              />
            </form>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" type="submit">
              Join Room
            </Button>
          </Grid>
        </Grid>
        {joinError && (
          <Typography className="error-message" color="error" variant="caption">
            {joinError}
          </Typography>
        )}
      </Card>
    )
  }
}

/**
 * Connect Material UI Styles to Component
 */
export default JoinSpecificRoom
