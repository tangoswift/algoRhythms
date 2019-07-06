import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {signOutThunk} from '../store/auth'

// Material UI Dependencies
import {fade, makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  navlinks: {
    margin: theme.spacing(1)
  }
}))

const Navbar = ({auth, signOut}) => {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link
              component={RouterLink}
              underline="none"
              color="inherit"
              to="/"
            >
              algoRhythms
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div>
            {auth.uid ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link
                  component={RouterLink}
                  underline="none"
                  color="inherit"
                  to="/home"
                  className={classes.navlinks}
                >
                  <Button variant="text" color="inherit">
                    Home
                  </Button>
                </Link>
                <Link
                  component={RouterLink}
                  underline="none"
                  color="inherit"
                  to="/profile"
                  className={classes.navlinks}
                >
                  <Button variant="text" color="inherit">
                    My Profile
                  </Button>
                </Link>
                <Link
                  onClick={signOut}
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                  to="/login"
                  className={classes.navlinks}
                >
                  <Button variant="text" color="inherit">
                    Logout
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link
                  component={RouterLink}
                  underline="none"
                  color="inherit"
                  to="/login"
                  className={classes.navlinks}
                >
                  <Button variant="text" color="inherit">
                    Login
                  </Button>
                </Link>
                <Link
                  component={RouterLink}
                  underline="none"
                  color="inherit"
                  to="/signup"
                  className={classes.navlinks}
                >
                  <Button variant="text" color="inherit">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatch = dispatch => {
  return {
    signOut: () => dispatch(signOutThunk())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
