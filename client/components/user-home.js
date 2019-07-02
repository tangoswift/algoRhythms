import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addRoomThunk} from '../store/roomId'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import history from '../history'
// Material UI Dependencies
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {roomToUserThunk} from '../store/user'

/**
 * MATERIAL UI
 */

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

/**
 * COMPONENT
 */

class UserHome extends Component {
  handleJoinRoom = async e => {
    e.preventDefault()
    const roomId = e.target.roomId.value
    const userId = this.props.auth.uid
    await this.props.addRoomToUser(roomId, userId)
    history.push(`/rooms/${roomId}`)
  }

  createRoom = async roomInfo => {
    await this.props.createRoom(roomInfo)
    const roomId = this.props.roomId
    const userId = this.props.auth.uid
    await this.props.addRoomToUser(roomId, userId)
    history.push(`/rooms/${roomId}`)
  }

  render() {
    const {problems} = this.props
    let problemsKeys = null
    if (problems) {
      problemsKeys = Object.keys(problems)
    }

    const classes = this.props
    const bull = <span className={classes.bullet}>•</span>
    return (
      <Container>
        <Typography component="h2" variant="h5">
          Welcome, {this.props.profile.firstName} {this.props.profile.lastName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card} color="primary">
              <ul>
                <Typography component="h5" variant="h5">
                  Available rooms:{' '}
                </Typography>
                {problems ? (
                  problemsKeys.map(problemName => (
                    <li key={problemName}>
                      <Typography component="h5" variant="h5">
                        <Button
                          onClick={() => this.createRoom(problems[problemName])}
                        >
                          {problems[problemName].name}
                        </Button>
                        <a> {problems[problemName].instructions}</a>
                      </Typography>
                    </li>
                  ))
                ) : (
                  <h5>loading...</h5>
                )}
              </ul>
            </Card>
            <form onSubmit={this.handleJoinRoom}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="roomId"
                    name="roomId"
                    label="roomId"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button type="submit">Submit</Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <Typography component="h5" variant="h5">
                USER STATS:
                <li>
                  Name: {this.props.profile.firstName}{' '}
                  {this.props.profile.lastName}
                </li>
                <li>Problems solved: 0</li>
                <li>Points earned: 0</li>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    problems: state.firestore.data.problems,
    roomId: state.roomId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRoom: roomInfo => dispatch(addRoomThunk(roomInfo)),
    addRoomToUser: (roomId, userId) => dispatch(roomToUserThunk(roomId, userId))
  }
}

export default withStyles(styles)(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'problems'}])
  )(UserHome)
)
