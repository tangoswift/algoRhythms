import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

export default function UserEntrySnackbar(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  let {visible} = props
  let openState = visible

  function handleClick() {
    setOpen(true)
  }

  function handleClose(event, reason) {
    // if (reason === 'clickaway') {
    //   return;
    // }
    console.log('close has been clicked')
    openState = true
  }

  return (
    <div>
      {console.log(openState)}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={!openState}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">There are 2 users in the room</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  )
}
