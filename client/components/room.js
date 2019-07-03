import WebWorker from '../workers/WebWorker'
import twoSumWorker from '../workers/TwoSumWorker'
import React from 'react'
import targetSumWorker from '../workers/TargetSumWorker'
import RoomResults from './RoomResults'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {AceCodeEditor} from './AceCodeEditor'

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
    let id = this.props.match.params.id
    let name = ''
    let results = []
    let code = ''
    let instructions = ''
    const classes = this.props

    if (this.props.rooms && this.props.rooms[id]) {
      name = this.props.rooms[id].name
      code = this.props.rooms[id].code
      instructions = this.props.rooms[id].instructions
      results = this.props.rooms[id].result
    }

    return (
      <Container className={classes.root}>
        <Box bgcolor="text.hint" color="background.paper">
          <Typography align="center" component="div" variant="body1">
            Get Into The Rhythm: {id}
          </Typography>
        </Box>
        <Grid container spacing={2} className="room">
          <Grid item xs={8} pr={0}>
            <Typography variant="h6">Instructions: {instructions}</Typography>
            <AceCodeEditor code={code} onChange={this.onChange} />
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
            <Box bgcolor="text.primary" color="background.paper" height="100%">
              <iframe
                src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=c5b89831-6e30-4f25-a41e-d19d8b84ae1f&room=${id}&iframe=true`}
                width="100%"
                height="50%"
                allow="microphone; camera"
              />
              <Typography variant="h6">Test Results:</Typography>
              <RoomResults results={results} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    rooms: state.firestore.data.rooms,
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
