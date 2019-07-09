import WebWorker from '../workers/WebWorker'
import twoSumWorker from '../workers/TwoSumWorker'
import React from 'react'
import targetSumWorker from '../workers/TargetSumWorker'
import intersection from '../workers/Intersection'
import returnNegative from '../workers/ReturnNegative'
import palindromeWorker from '../workers/PalindromeWorker'
import reverseWordsWorker from '../workers/ReverseWordsWorker'
import Loading from './Loading'
import RoomResults from './RoomResults'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {AceCodeEditor} from './AceCodeEditor'
import Countdown from './CountDown'
// Material UI Dependencies
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {changeCodeThunk, updateResultThunk} from '../store/roomId'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

/**
 * MATERIAL UI
 */
const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToTarget = this.redirectToTarget.bind(this)
  }

  handleSetWorker = workerName => {
    switch (workerName) {
      case 'TwoSum':
        return twoSumWorker
      case 'TargetSum':
        return targetSumWorker
      case 'Intersection':
        return intersection
      case 'ReturnNegative':
        return returnNegative
      case 'Palindrome':
        return palindromeWorker
      case 'ReverseWords':
        return reverseWordsWorker
      default:
        return null
    }
  }

  onChange = async newValue => {
    await this.props.changeCode(this.props.match.params.id, newValue)
  }

  handleOnRun = (e, code, name) => {
    let newWorker = this.handleSetWorker(name)
    this.worker = new WebWorker(newWorker)
    this.worker.addEventListener('message', e => {
      this.props.updateResult(this.props.match.params.id, e.data)
    })
    this.worker.postMessage(code)
    //Terminate worker after 10s
    setTimeout(() => this.worker.terminate(), 10000)
  }

  redirectToTarget = () => {
    this.props.history.push('/home')
  }

  render() {
    let {room} = this.props
    /**
     * Check if room exist
     */
    if (!room) {
      return <Loading />
    } else {
      let id = this.props.match.params.id
      const classes = this.props
      const {profile} = this.props
      let {
        name,
        result,
        code,
        instructions,
        start,
        solved,
        visible
      } = this.props.room

      return (
        <Container className={classes.root}>
          <Box bgcolor="text.hint" color="background.paper">
            {start && (
              <Typography align="center">
                You are currently the {profile.role}
              </Typography>
            )}
            <Typography align="center" component="div" variant="body1">
              Get Into The Rhythm: {id}
              {!solved && (
                <Countdown
                  start={start}
                  roomId={id}
                  role={profile.role}
                  visible={visible}
                />
              )}
            </Typography>
          </Box>
          <Grid container spacing={2} className="room">
            <Grid item xs={8} pr={0}>
              <Typography variant="h6">Instructions: {instructions}</Typography>
              <AceCodeEditor
                code={code}
                onChange={this.onChange}
                role={profile.role}
                start={start}
              />
              <Grid container justify="space-between">
                <Button
                  type="submit"
                  name="action"
                  onClick={e => this.handleOnRun(e, code, name)}
                  variant="contained"
                  color="primary"
                >
                  RUN
                </Button>
                <Button
                  type="button"
                  onClick={this.redirectToTarget}
                  variant="contained"
                  color="primary"
                >
                  BAIL
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box
                bgcolor="text.primary"
                color="background.paper"
                height="100%"
              >
                <iframe
                  src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=c5b89831-6e30-4f25-a41e-d19d8b84ae1f&room=${id}&iframe=true`}
                  width="100%"
                  height="50%"
                  allow="microphone; camera"
                />

                <Typography variant="h6">Test Results: </Typography>
                <RoomResults result={result} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const roomId = ownProps.match.params.id
  const rooms = state.firestore.data.rooms
  const room = rooms ? rooms[roomId] : null
  return {
    profile: state.firebase.profile,
    room: room,
    users: state.firestore.data.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCode: (roomId, code) => dispatch(changeCodeThunk(roomId, code)),
    updateResult: (roomId, result) =>
      dispatch(updateResultThunk(roomId, result))
  }
}

export default withStyles(styles)(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'rooms'}])
  )(Room)
)
