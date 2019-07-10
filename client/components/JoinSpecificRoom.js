import React from 'react'
import Button from '@material-ui/core/Button'
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
    e.persist()
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
      <Card className={classes.joinRoom}>
        <form onSubmit={this.handleJoinRoom}>
          <Grid justify="space-between" container>
            <Grid item className={classes.textField}>
              <TextField
                label="Enter Room ID"
                name="roomId"
                fullWidth
                id="mui-theme-provider-outlined-input"
              />
            </Grid>
            <Grid style={{padding: '5px 0px'}} item>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                className={classes.userName}
              >
                Join Room
              </Button>
            </Grid>
          </Grid>
        </form>
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
