import React from 'react'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Login} from './login'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Login', () => {
  let login

  const classes = {
    paper: '',
    form: '',
    TextField: '',
    submit: ''
  }

  it('lists firebase authentication error messages', () => {
    login = shallow(<Login classes={classes} authError={authError} />)
    const authError = 'Firebase Error Message'

    expect(login.find('.error-message').text()).to.equal(authError)
  })
})
