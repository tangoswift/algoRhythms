import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import CodeIcon from '@material-ui/icons/Code'

import EmptyState from './EmptyState'

const styles = theme => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
})

class Homepage extends Component {
  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <img
          src="https://camo.githubusercontent.com/e5e84ef5a06e6435b70c8a4fc2a3324169dfd4c1/68747470733a2f2f7777772e657665726e6f74652e636f6d2f6c2f41415556584346745a5f5648356f41516e37334a576d77665249564d5a395272655877422f696d6167652e706e67"
          width="1000"
          height="600"
          align="right"
        />

        <EmptyState
          icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
          title="Practice Pair-Programing"
          description={
            <p>
              Learn to get in the{' '}
              <b>
                <i>rhythm</i>
              </b>{' '}
              <br />
              of solving challenges in pairs
            </p>
          }
          button={
            <Fab
              className={classes.button}
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              variant="extended"
            >
              Sign Up to Play
            </Fab>
          }
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Homepage)
