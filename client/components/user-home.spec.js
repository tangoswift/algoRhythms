/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import {spy} from 'sinon'

// Components
import {AvailableRooms} from './AvailableRooms'
import ListItem from '@material-ui/core/ListItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome, userHomeSpy, solvedRooms
  const correctResult = 'Thats right!'
  const otherResult = 'Waiting...'
  const profile = {firstName: 'Cody', lastName: 'Dog'}
  const roomHistory = [
    {result: correctResult, points: 1},
    {result: otherResult, points: 2},
    {result: correctResult, points: 3}
  ]
  const rooms = {
    r1: {name: 'r1', visible: true},
    r2: {name: 'r2', visible: true},
    r3: {name: 'r3', visible: true},
    r4: {name: 'r4', visible: false},
    r5: {name: 'r5', visible: true}
  }
  const problems = {
    p1: {name: 'p1', instructions: 'p1-instructions'},
    p2: {name: 'p2', instructions: 'p2-instructions'},
    p3: {name: 'p3', instructions: 'p3-instructions'}
  }

  beforeEach(() => {
    userHomeSpy = spy() // Use for the life cycle method
    userHome = shallow(
      <UserHome
        profile={profile}
        roomHistory={roomHistory}
        problems={problems}
        getRooms={userHomeSpy}
      />
    )
    solvedRooms = roomHistory.filter(obj => obj.result === correctResult)
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

    // it('test', () => {
    //   expect(
    //     userHome
    //       .find('.problem-instruction')
    //       .at(0)
    //       .text()
    //   ).to.exist
    // })
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

  /**
   * STATISTICS CARD
   */
  describe('Stats Card', () => {
    it('lists users name', () => {
      let name = `Name: ${profile.firstName} ${profile.lastName}`
      expect(userHome.find('.stats-name').text()).to.equal(name)
    })

    it('lists number of problems solved', () => {
      let solved = `Problems solved: ${solvedRooms.length}`
      expect(userHome.find('.stats-solved').text()).to.equal(solved)
    })

    it('lists number of points earned', () => {
      let points = `Points earned: ${solvedRooms.reduce(
        (tot, rm) => tot + rm.points,
        0
      )}`
      expect(userHome.find('.stats-points').text()).to.equal(points)
    })
  })
})
