import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {List, ListItem, makeSelectable} from 'material-ui/List'
// import Subheader from 'material-ui/Subheader'
import {connect} from 'react-redux'
import {roomToUserThunk} from '../store/user'
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
  const {rooms, userId} = props
  const roomIds = Object.keys(rooms)

  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = async (event, id, idx) => {
    event.preventDefault()
    await props.addRoomToUser(id, userId)
    history.push(`/rooms/${id}`)
    setSelectedIndex(idx)
  }

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
        {roomIds.map((id, idx) => {
          return rooms[id].result !== 'Thats right!' ? (
            <ListItem
              button
              selected={selectedIndex === idx}
              onClick={event => handleListItemClick(event, id, idx)}
            >
              <ListItemText primary={rooms[id].name} />
            </ListItem>
          ) : null
        })}
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addRoomToUser: (roomId, userId) => dispatch(roomToUserThunk(roomId, userId))
  }
}

export default connect(null, mapDispatchToProps)(AvailableRooms)
