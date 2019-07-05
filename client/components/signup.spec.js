import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SignUp} from '../components/signup'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SignUp', () => {
  let signUp

  const classes = {
    paper: '',
    form: '',
    TextField: '',
    submit: ''
  }

  it('lists an error message if password is invalid', () => {
    const fakeEvent = {preventDefault: () => {}}

    signUp = shallow(<SignUp classes={classes} />)

    signUp.find('form').simulate('submit', fakeEvent)
    expect(signUp.find('.error-message').text()).to.equal(
      'The password needs to be at least 6 characters'
    )
  })

  it('lists firebase authentication error message', () => {
    const authError = 'Firebase Error Message'
    const fakeEvent = {preventDefault: () => {}}

    signUp = shallow(<SignUp classes={classes} authError={authError} />)

    signUp.find('form').simulate('submit', fakeEvent)
    expect(signUp.find('.error-message').text()).to.equal(authError)
  })
})
