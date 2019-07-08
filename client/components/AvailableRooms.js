import React from 'react'
import {connect} from 'react-redux'
import {roomToUserThunk} from '../store/user'
import {updateVisibilityThunk} from '../store/roomId'
import history from '../history'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles} from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import {JoinSpecificRoom} from './JoinSpecificRoom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}))

export const AvailableRooms = props => {
  const {rooms, userId, updateVisibility, firestore} = props

  const classes = useStyles()
  const handleListItemClick = async (event, id) => {
    event.preventDefault()
    await props.addRoomToUser(id, userId)
    await updateVisibility(id)
    history.push(`/rooms/${id}`)
  }

  const roomList = rooms
    .map(room => {
      return room.visible ? (
        <ListItem
          key={room.id}
          button
          onClick={event => handleListItemClick(event, room.id)}
        >
          <ListItemText
            primary={`${room.id} - ${room.name} - ${room.points} Points`}
          />
        </ListItem>
      ) : null
    })
    .filter(component => component !== null)

  return (
    <div className={classes.root}>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <JoinSpecificRoom
              firestore={firestore}
              handleListItemClick={handleListItemClick}
            />
            Most Recent Available Rooms:
          </ListSubheader>
        }
      >
        {roomList.length ? roomList : 'No rooms available.'}
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addRoomToUser: (roomId, userId) =>
      dispatch(roomToUserThunk(roomId, userId)),
    updateVisibility: roomId => {
      dispatch(updateVisibilityThunk(roomId))
    }
  }
}

export default connect(null, mapDispatchToProps)(AvailableRooms)
