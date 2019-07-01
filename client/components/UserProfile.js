import React, {Component} from 'react'
import ProblemsSolved from './ProblemsSolved'
import {UserInfo} from '.'

export class UserProfile extends Component {
  render() {
    return (
      <div>
        <h1>Problems Solved</h1>
        <ProblemsSolved />
        <h1>Total Points</h1>
        <UserInfo />
      </div>
    )
  }
}

export default UserProfile

/* eslint-disable no-script-url */
