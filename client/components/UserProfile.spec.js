/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserProfile} from './UserProfile'
import {getRoomHistoryThunk} from '../store/user'
import {spy} from 'sinon'
import ProblemsSolved from './ProblemsSolved'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserProfile', () => {
  let userProfile, userProfileSpy, solvedRooms
  const correctResult = true
  const otherResult = false
  const profile = {
    firstName: 'Cody',
    lastName: 'Dog',
    displayName: 'Cody Dog',
    uid: 'codyDogUID'
  }
  const classes = {root: ''}

  const roomHistory = [
    {solved: correctResult, points: 1},
    {solved: otherResult, points: 2},
    {solved: correctResult, points: 3}
  ]

  beforeEach(() => {
    userProfileSpy = spy() // Use for the life cycle method
    userProfile = shallow(
      <UserProfile
        profile={profile}
        roomHistory={roomHistory}
        classes={classes}
        getRooms={getRoomHistoryThunk}
      />
    )
    solvedRooms = roomHistory.filter(obj => obj.solved === correctResult)
  })

  /**
   * STATISTICS CARD
   */
  describe('User Profile Card', () => {
    it('has an avatar associated with user profile', () => {
      expect(userProfile.find(Avatar).length).to.equal(1)
    })

    it('lists number of problems solved/ problemssolved component', () => {
      expect(userProfile.find(Badge).length).to.equal(2)
    })
  })
})
