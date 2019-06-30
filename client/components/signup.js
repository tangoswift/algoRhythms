import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {signUpThunk} from '../store/auth'

// Material UI Dependencies
import {withStyles, createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {blue} from '@material-ui/core/colors'

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
    margin: theme.spacing(3, 0, 2),
    palette: {
      primary: blue
    }
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#01579b'
    }
  }
})

/**
 * COMPONENT
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.signUp(this.state)
    history.push('/home')
  }

  handleOnChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {authError} = this.props
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={this.handleOnSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleOnChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleOnChange}
                    variant="outlined"
                  />
                </Grid>
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
                Sign Up
              </Button>
            </form>
            {authError}
          </div>
        </Container>
      </ThemeProvider>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatch = dispatch => {
  return {
    signUp: user => dispatch(signUpThunk(user))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(SignUp))
