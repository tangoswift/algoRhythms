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

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

export default function ProblemsSolved(props) {
  const classes = useStyles()
  const {roomHistory} = props
  console.log(roomHistory)

  return (
    <React.Fragment>
      {/* <Title>Recent ProblemsSolved</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Result</TableCell>
            <TableCell align="right">Points Earned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomHistory.map((problem, idx) => (
            <Link
              key={idx}
              component={RouterLink}
              underline="none"
              color="inherit"
              to={`/rooms/${problem.id}`}
              className={classes.navlinks}
            >
              <Button variant="text" color="inherit">
                <TableRow>
                  <TableCell>{problem.name}</TableCell>
                  <TableCell>{problem.result}</TableCell>
                  <TableCell align="right">
                    {problem.visible === false ? problem.points : 0}
                  </TableCell>
                </TableRow>
              </Button>
            </Link>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
