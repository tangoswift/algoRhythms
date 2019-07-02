/* eslint-disable no-script-url */

import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

export default function ProblemsSolved(props) {
  const classes = useStyles()
  const {roomHistory} = props

  return (
    <React.Fragment>
      {/* <Title>Recent ProblemsSolved</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Instructions</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Result</TableCell>
            <TableCell align="right">Points Earned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomHistory.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.instructins}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.result}</TableCell>
              <TableCell align="right">{row.pointsEarned}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
