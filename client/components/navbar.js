import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {signOutThunk} from '../store/auth'

// Material UI Dependencies
import {fade, makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}))

const Navbar = ({auth, signOut}) => {
  const classes = useStyles()
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            algoRhythms
          </Typography>
          <div className={classes.grow} />
          <div>
            {auth.uid ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <IconButton color="inherit">
                  <Badge color="secondary">
                    <Link component={RouterLink} color="inherit" to="/home">
                      Home
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge color="secondary">
                    <Link component={RouterLink} color="inherit" to="/profile">
                      My Profile
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge color="secondary">
                    <Link
                      onClick={signOut}
                      component={RouterLink}
                      color="inherit"
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Badge>
                </IconButton>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <IconButton color="inherit">
                  <Badge color="secondary">
                    <Link component={RouterLink} color="inherit" to="/login">
                      Login
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge color="secondary">
                    <Link component={RouterLink} color="inherit" to="/signup">
                      Sign Up
                    </Link>
                  </Badge>
                </IconButton>
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

/**
 * PROP TYPES
 */
