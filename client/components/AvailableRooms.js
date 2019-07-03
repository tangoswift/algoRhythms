import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {List, ListItem, makeSelectable} from 'material-ui/List'
// import Subheader from 'material-ui/Subheader'
import {connect} from 'react-redux'
import {roomToUserThunk} from '../store/user'
import {updateVisibilityThunk} from '../store/roomId'
import history from '../history'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles} from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
    // backgroundColor: theme.palette.background.paper
  }
}))

const AvailableRooms = props => {
  const {rooms, userId, updateVisibility} = props
  const roomIds = Object.keys(rooms)

  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = async (event, id, idx) => {
    event.preventDefault()
    await props.addRoomToUser(id, userId)
    await updateVisibility(id)
    history.push(`/rooms/${id}`)
    setSelectedIndex(idx)
  }

  const roomList = roomIds
    .map((id, idx) => {
      return rooms[id].visible ? (
        <ListItem
          key={idx}
          button
          selected={selectedIndex === idx}
          onClick={event => handleListItemClick(event, id, idx)}
        >
          <ListItemText primary={rooms[id].name} />
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
            Available Rooms:
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
      console.log('ID', roomId)
      dispatch(updateVisibilityThunk(roomId))
    }
  }
}

export default connect(null, mapDispatchToProps)(AvailableRooms)
