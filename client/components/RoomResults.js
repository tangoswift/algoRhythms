import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  pass: {
    color: 'green'
  },
  fail: {
    color: 'red'
  },
  resultList: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingRight: '0px'
  },
  resultIcon: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function RoomResults(props) {
  const classes = useStyles()
  return (
    <div className={classes.grow}>
      <Typography variant="subtitle1" align="center">
        Test Results:
      </Typography>
      <List className={classes.resultList}>
        {props.result.map((result, idx) => {
          const pass = result.includes('Pass')
          let passOrFail = null
          let passOrFailIcon = null
          if (pass) {
            passOrFail = classes.pass
            passOrFailIcon = <CheckCircleOutline className={classes.pass} />
          } else {
            passOrFail = classes.fail
            passOrFailIcon = <ErrorOutline color="error" />
          }
          return (
            <ListItem key={idx} className={classes.resultList}>
              <ListItemText primary={result} className={passOrFail} />
              <ListItemIcon className={classes.resultIcon}>
                {passOrFailIcon}
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
