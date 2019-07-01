import React from 'react'
import {connect} from 'react-redux'
import {getRoomsThunk} from '../store/rooms'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
// Material UI Dependencies
import {withStyles, createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import {blue} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'

/**
 * MATERIAL UI
 */

const useStyles = makeStyles({
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
export const UserHome = props => {
  const {rooms} = props

  let roomKeys = null
  if (rooms) {
    roomKeys = Object.keys(rooms)
  }
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  return (
    <Container>
      <Typography component="h2" variant="h5">
        Welcome, {props.profile.firstName} {props.profile.lastName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card} color="primary">
            <ul>
              <Typography component="h5" variant="h5">
                Available rooms:{' '}
              </Typography>

              {rooms ? (
                roomKeys.map(roomName => (
                  <li key={roomName}>
                    <Typography component="h5" variant="h5">
                      <Link to={`/rooms/${rooms[roomName].name}/${roomName}`}>
                        {rooms[roomName].name}
                      </Link>
                      <a> {rooms[roomName].instructions}</a>
                    </Typography>
                  </li>
                ))
              ) : (
                <h5>loading...</h5>
              )}
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <Typography component="h5" variant="h5">
              USER STATS:
              <li>
                Name: {props.profile.firstName} {props.profile.lastName}
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

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    rooms: state.firestore.data.rooms
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: 'rooms'}])
)(UserHome)
