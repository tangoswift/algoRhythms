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
    const authError = 'Firebase Error Message'
    login = shallow(<Login classes={classes} authError={authError} />)

    expect(login.find('.error-message').text()).to.equal(authError)
  })
})
