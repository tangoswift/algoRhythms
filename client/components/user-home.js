import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addRoomThunk} from '../store/roomId'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import history from '../history'
import {roomToUserThunk, setRoleAsNavigatorThunk} from '../store/user'
import {updateProfileThunk} from '../store/auth'
import AvailableRooms from './AvailableRooms'
// Material UI Dependencies
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import blue from '@material-ui/core/colors/blue'
import Loading from './Loading'
import Typography from '@material-ui/core/Typography'

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
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    border: 0,
    padding: '0 30px',
    height: '48px',
    boxShadow: '0 3px 5px 2px rgba(25, 15, 15, .3)',
    marginTop: '10px',
    marginBottom: '10px',
    elevation: '18',
    backgroundColor: '#ffffff'
  },
  blue: {
    margin: '3px',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(10, 10, 10, .3)',
    marginTop: '24px',
    marginBottom: '24px',
    height: '58px'
  },
  textField: {
    width: '350px'
  }
})

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {selectedIndex: null, open: {}}
    this.handleOpen = this.handleOpen.bind(this)
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
    await this.props.setAsNavigator(roomId, userId)
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
    const {problems, userId, rooms, firestore} = this.props
    const {auth, profile, updateProfile} = this.props
    const user = {}
    let problemsKeys = null

    if (!problems) {
      return <Loading />
    } else {
      if (!profile.isLoaded && auth.displayName) {
        user.id = auth.uid
        user.firstName = auth.displayName.split(' ')[0]
        user.lastName = auth.displayName.split(' ')[1]
        updateProfile(user)
      }

      problemsKeys = Object.keys(problems)
      const {classes} = this.props
      return (
        <Container>
          <div className={classes.header}>
            <Typography color="primary">
              {`Welcome ${profile.firstName} ${profile.lastName}`}
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <AvailableRooms
                  userId={userId}
                  firestore={firestore}
                  rooms={rooms || []}
                  classes={classes}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card} color="primary">
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Choose a new Problem:
                    </ListSubheader>
                  }
                >
                  {problems &&
                    problemsKeys.map((problemName, idx) => (
                      <div key={idx}>
                        <ListItem
                          selected={this.state.selectedIndex === idx}
                          button
                          onClick={() => this.handleOpen(idx)}
                        >
                          <ListItemText
                            className="problem-name"
                            primary={problems[problemName].name}
                          />
                          {this.state.open[idx] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
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
                                className="problem-instruction"
                                primary={problems[problemName].instructions}
                              >
                                {problems[problemName].instructions}
                              </ListItemText>
                            </ListItem>
                          </List>
                        </Collapse>
                      </div>
                    ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )
    }
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
    rooms: state.firestore.ordered.rooms,
    roomId: state.roomId,
    userId: state.firebase.auth.uid,
    firebase: state.firebase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRoom: roomInfo => dispatch(addRoomThunk(roomInfo)),
    addRoomToUser: (roomId, userId) =>
      dispatch(roomToUserThunk(roomId, userId)),
    updateProfile: user => dispatch(updateProfileThunk(user)),
    setAsNavigator: (roomId, userId) =>
      dispatch(setRoleAsNavigatorThunk(roomId, userId))
  }
}

export default withStyles(styles)(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {collection: 'problems'},
      {collection: 'rooms', limit: 10, orderBy: ['timestamp', 'desc']}
    ])
  )(UserHome)
)
