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

// let SelectableList = makeSelectable(List)

// function wrapState(ComposedComponent) {
//   return class SelectableList extends Component {
//     static propTypes = {
//       children: PropTypes.node.isRequired,
//       defaultValue: PropTypes.number.isRequired
//     }

//     componentWillMount() {
//       this.setState({
//         selectedIndex: this.props.defaultValue
//       })
//     }

//     handleRequestChange = (event, index) => {
//       this.setState({
//         selectedIndex: index
//       })
//     }

//     render() {
//       return (
//         <ComposedComponent
//           value={this.state.selectedIndex}
//           onChange={this.handleRequestChange}
//         >
//           {this.props.children}
//         </ComposedComponent>
//       )
//     }
//   }
// }

// SelectableList = wrapState(SelectableList)

// const AvailableRooms = props => {
//   const {rooms, userId} = props
//   const roomIds = Object.keys(rooms)

//   const onClick = id => {
//     props.addRoomToUser(id, userId)
//     history.push(`/rooms/${id}`)
//   }

//   return (
//     <SelectableList defaultValue={3}>
//       <Subheader>Availble Rooms</Subheader>
//       {roomIds.map((id, idx) => {
//         return rooms[id].result !== 'Thats right!' ? (
//           <ListItem
//             key={id}
//             button={true}
//             value={idx + 1}
//             primaryText={rooms[id].name}
//             action={onClick(id)}
//           />
//         ) : null
//       })}
//     </SelectableList>
//   )
// }

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  }
}))

const AvailableRooms = props => {
  const {rooms, userId} = props
  const roomIds = Object.keys(rooms)
  const onClick = async id => {
    await props.addRoomToUser(id, userId)
    console.log(id)
    history.push(`/rooms/${id}`)
  }

  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = async (event, id, idx) => {
    await props.addRoomToUser(id, userId)
    history.push(`/rooms/${id}`)
    setSelectedIndex(idx)
  }

  return (
    // <div>
    //   {roomIds.map((id, idx) => {
    //     return rooms[id].result !== 'Thats right!' ? (
    //       <button type="button" key={id} onClick={() => onClick(id)}>
    //         {rooms[id].name}
    //       </button>
    //     ) : null
    //   })}
    // </div>
    <div className={classes.root}>
      <List component="nav">
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
