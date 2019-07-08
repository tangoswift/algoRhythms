import React from 'react'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import db from '../../server/firebase/fbConfig'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

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
    const {classes} = this.props
    const {joinError} = this.state
    return (
      <div>
        <form onSubmit={this.handleJoinRoom}>
          <TextField
            label="Enter Room ID"
            name="roomId"
            id="mui-theme-provider-outlined-input"
          />
          <Button color="primary" variant="contained" type="submit">
            Join Room
          </Button>
        </form>
        {joinError && (
          <Typography className="error-message" color="error" variant="caption">
            {joinError}
          </Typography>
        )}
      </div>
    )
  }
}

/**
 * Connect Material UI Styles to Component
 */
export default withStyles(styles)(JoinSpecificRoom)
