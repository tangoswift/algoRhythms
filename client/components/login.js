import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {signInThunk} from '../store/auth'

/**
 * COMPONENT
 */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
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
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
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
    signIn: cred => dispatch(signInThunk(cred))
  }
}

export default connect(mapState, mapDispatch)(Login)
