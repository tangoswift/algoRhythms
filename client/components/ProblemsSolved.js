/* eslint-disable no-script-url */

import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}))

export default function ProblemsSolved(props) {
  const classes = useStyles()
  const {roomHistory} = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Room Id</TableCell>
          <TableCell>Instructions</TableCell>
          <TableCell>Result</TableCell>
          <TableCell>Points Earned</TableCell>
        </TableRow>

        <TableBody>
          {roomHistory.map(problem => (
            <TableRow key={problem.id}>
              <TableCell>{problem.name}</TableCell>
              <TableCell
                align="left"
                numeric
                component="a"
                href={`/rooms/${problem.id}`}
              >
                {problem.id}
              </TableCell>
              <TableCell>{problem.instructions}</TableCell>
              <TableCell>
                {problem.solved === true ? 'Solved' : 'Pending'}
              </TableCell>
              <TableCell>
                {problem.solved === true ? problem.points : 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
