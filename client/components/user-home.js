import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addRoomThunk} from '../store/roomId'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import history from '../history'
import {roomToUserThunk, getRoomHistoryThunk} from '../store/user'
import AvailableRooms from './AvailableRooms'
// Material UI Dependencies
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Loading from './Loading'

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
  constructor(props) {
    super(props)
    this.state = {selectedIndex: null, open: {}}
    this.handleOpen = this.handleOpen.bind(this)
  }

  componentDidMount() {
    this.props.getRooms(this.props.userId)
  }

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

  handleOpen = index => {
    this.setState({
      open: {
        ...this.state.open,
        [index]: this.state.open[index] ? !this.state.open[index] : true
      }
    })
  }

  render() {
    const {problems, roomHistory, userId, rooms} = this.props
    let problemsKeys = null
    if (problems) {
      problemsKeys = Object.keys(problems)
    }
    const classes = this.props

    return (
      <Container>
        <Typography component="h2" variant="h5">
          Welcome, {this.props.profile.firstName} {this.props.profile.lastName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card} color="primary">
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Choose a Problem:
                  </ListSubheader>
                }
              >
                {problems ? (
                  problemsKeys.map((problemName, idx) => (
                    <div key={idx}>
                      <ListItem
                        selected={this.state.selectedIndex === idx}
                        button
                        onClick={() => this.handleOpen(idx)}
                      >
                        <ListItemText primary={problems[problemName].name} />
                        {this.state.open[idx] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse
                        in={this.state.open[idx]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            onClick={() =>
                              this.createRoom(problems[problemName])
                            }
                          >
                            <ListItemText
                              primary={problems[problemName].instructions}
                            />
                          </ListItem>
                        </List>
                      </Collapse>
                    </div>
                  ))
                ) : (
                  <Loading />
                )}
              </List>
            </Card>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <ListSubheader component="div">User Stats:</ListSubheader>
                <Typography component="h5" variant="h5">
                  {/* USER STATS: */}
                  <li>
                    Name: {this.props.profile.firstName}{' '}
                    {this.props.profile.lastName}
                  </li>
                  <li>
                    Problems solved:{' '}
                    {roomHistory
                      ? roomHistory.filter(
                          room => room.result === 'Thats right!'
                        ).length
                      : 'Loading'}
                  </li>
                  <li>Points earned: 0</li>
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <AvailableRooms userId={userId} rooms={rooms || {}} />
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
    rooms: state.firestore.data.rooms,
    roomId: state.roomId,
    roomHistory: state.user.roomHistory,
    userId: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRoom: roomInfo => dispatch(addRoomThunk(roomInfo)),
    addRoomToUser: (roomId, userId) =>
      dispatch(roomToUserThunk(roomId, userId)),
    getRooms: userId => dispatch(getRoomHistoryThunk(userId))
  }
}

export default withStyles(styles)(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'problems'}, {collection: 'rooms'}])
  )(UserHome)
)
