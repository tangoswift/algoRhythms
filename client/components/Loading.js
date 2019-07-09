import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}))

export default function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <CircularProgress size={80} thicketness={5} className={classes.progress} />
  )
}
