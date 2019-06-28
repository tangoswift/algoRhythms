import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {signUpThunk} from '../store/auth'

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
    const {authError} = this.props
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleOnChange}
          />
          <input
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleOnChange}
          />
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleOnChange}
          />
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
          <button type="submit">Submit</button>
        </form>
        {authError}
      </div>
    )
  }
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

export default connect(mapState, mapDispatch)(SignUp)
