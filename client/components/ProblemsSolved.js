/* eslint-disable no-script-url */

import React, {Component} from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {getRoomHistoryThunk} from '../store/user'
import {connect} from 'react-redux'

// import Title from './Title';

// Generate Order Data
// function createData(id, date, partner, problemType, status, pointsEarned) {
//   return {id, date, partner, problemType, status, pointsEarned}
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Binary Search Tree',
//     'Yes',
//     2
//   ),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'Find Min/Max', 'No', 0),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Dynamic Programming', 'Yes', 1),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Array and Objects',
//     'No',
//     0
//   ),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Hash Table', 'Yes', 5)
// ]

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

// export default function ProblemsSolved(props) {
//   const classes = useStyles()
//   console.log("PROPS>>", props.roomHistory[0])
//   return (
//     <React.Fragment>
//       {/* <Title>Recent ProblemsSolved</Title> */}
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Partner</TableCell>
//             <TableCell>Problem</TableCell>
//             <TableCell>Completed</TableCell>
//             <TableCell align="right">Points Earned</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.partner}</TableCell>
//               <TableCell>{row.problemType}</TableCell>
//               <TableCell>{row.status}</TableCell>
//               <TableCell align="right">{row.pointsEarned}</TableCell>
//             </TableRow>
//           ))} */}
//         </TableBody>
//       </Table>
//     </React.Fragment>
//   )
// }

class ProblemsSolved extends Component {
  componentDidMount() {
    this.props.getRooms(this.props.userId)
  }

  render() {
    console.log(this.props.roomHistory)
    return (
      <div>
        {/* <Title>Recent ProblemsSolved</Title> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Partner</TableCell>
              <TableCell>Problem</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell align="right">Points Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.partner}</TableCell>
              <TableCell>{row.problemType}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.pointsEarned}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('State inside profile>>>', state)
  return {
    roomHistory: state.user.roomHistory,
    userId: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: userId => dispatch(getRoomHistoryThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsSolved)
