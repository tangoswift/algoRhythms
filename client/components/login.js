import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {signInThunk, clearAuthMessageThunk} from '../store/auth'

// Material UI Dependencies
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import {uiConfig} from '../../server/firebase/fbConfig'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

/**
 * MATERIAL UI
 */
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  TextField: {
    padding: '0 0px',
    margin: '0 0px',
    verticalAlign: 'middle'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
})

/**
 * COMPONENT
 */
export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillUnmount = () => {
    //Reset the Auth Error when navigating away from Login Component
    this.props.clearAuthMessage()
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.signIn(this.state)
    history.push('/home')
  }

  handleOnChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {authError} = this.props
    const {auth} = this.props
    return (
      <React.Fragment>
        <Card>
          <CardMedia
            src="https://firebasestorage.googleapis.com/v0/b/algorhythms1904.appspot.com/o/ben-kolde-t9DooibgMEk-unsplash_fade.jpg?alt=media&token=defca4c6-573b-4956-98f1-57f446b9d3c6"
            component="img"
            style={{height: '100vh'}}
          />
        </Card>
        <Container component="main" maxWidth="xs" className={classes.center}>
          <div className={classes.paper}>
            {/* <Typography component="h1" variant="h5">
            Login
          </Typography> */}
            {/* <form onSubmit={this.handleOnSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  className={classes.textField}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form> */}

            {/* Renders Google sign in option */}
            {auth.isEmpty ? (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            ) : null}

            {authError && (
              <Typography
                className="error-message"
                color="error"
                variant="caption"
              >
                {authError}
              </Typography>
            )}
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatch = dispatch => {
  return {
    signIn: cred => dispatch(signInThunk(cred)),
    clearAuthMessage: () => dispatch(clearAuthMessageThunk())
  }
}

/**
 * Connect Material UI Styles to Component
 */
export default withStyles(styles)(connect(mapState, mapDispatch)(Login))
