/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import {updateProfileThunk} from '../store/auth'
import {spy} from 'sinon'

// Components
import {AvailableRooms} from './AvailableRooms'
import ListItem from '@material-ui/core/ListItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome, userHomeSpy, solvedRooms
  const correctResult = true
  const otherResult = false
  const profile = {firstName: 'Cody', lastName: 'Dog', displayName: 'Cody Dog'}

  const roomHistory = [
    {solved: correctResult, points: 1},
    {solved: otherResult, points: 2},
    {solved: correctResult, points: 3}
  ]

  const rooms = [
    {name: 'r1', visible: true},
    {name: 'r2', visible: true},
    {name: 'r3', visible: true},
    {name: 'r4', visible: false},
    {name: 'r5', visible: true}
  ]

  const problems = [
    {name: 'p1', instructions: 'p1-instructions'},
    {name: 'p2', instructions: 'p2-instructions'},
    {name: 'p3', instructions: 'p3-instructions'}
  ]

  beforeEach(() => {
    userHomeSpy = spy() // Use for the life cycle method
    userHome = shallow(
      <UserHome
        profile={profile}
        roomHistory={roomHistory}
        problems={problems}
        getRooms={userHomeSpy}
        auth={profile}
        updateProfile={updateProfileThunk}
      />
    )
    solvedRooms = roomHistory.filter(obj => obj.solved === correctResult)
  })

  it('renders the a greeting in an h2', () => {
    expect(userHome.find('.greeting').text()).to.equal(
      `Welcome, ${profile.firstName} ${profile.lastName}`
    )
  })

  /**
   * PROBLEMS CARD
   */
  describe('Problems Card', () => {
    it('lists all availble problems', () => {
      expect(userHome.find('.problem-name').length).to.equal(3)
    })

    it('lists instructions for the problem', () => {
      expect(
        userHome
          .find('.problem-instruction')
          .at(0)
          .text()
      ).to.equal('p1-instructions')

      expect(
        userHome
          .find('.problem-instruction')
          .at(1)
          .text()
      ).to.equal('p2-instructions')

      expect(
        userHome
          .find('.problem-instruction')
          .at(2)
          .text()
      ).to.equal('p3-instructions')
    })
  })

  /**
   * ROOM LIST  CARD
   */
  describe('Room List COMPONENT', () => {
    let availableRooms

    beforeEach(() => {
      availableRooms = shallow(<AvailableRooms rooms={rooms} />)
    })

    it('lists all visible rooms', () => {
      expect(availableRooms.find(ListItem).length).to.equal(4)
    })
  })
})
