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
import UserEntrySnackbar from './UserEntrySnackbar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

/**
 * MATERIAL UI
 */
const styles = theme => ({
  root: {
    dispay: 'flex',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    border: 0,
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: '10px',
    marginBottom: '10px'
  },
  btn: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  countdown: {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  progress: {
    margin: theme.spacing(2)
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
      const {profile, classes} = this.props

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
        <React.Fragment>
          <Container className={classes.root}>
            <Paper className={classes.header}>
              {!solved ? (
                <React.Fragment>
                  <LinearProgress className={classes.root} />
                  <Typography
                    className={classes.countdown}
                    align="center"
                    variant="h6"
                    gutterBottom
                  >
                    {visible ? (
                      'Waiting For Your Partner'
                    ) : (
                      <React.Fragment>
                        {start && (
                          <React.Fragment>
                            You are the {profile.role.toUpperCase()}
                          </React.Fragment>
                        )}
                        <Countdown
                          start={start}
                          roomId={id}
                          role={profile.role}
                        />
                      </React.Fragment>
                    )}
                  </Typography>
                  <LinearProgress variant="query" className={classes.root} />
                </React.Fragment>
              ) : (
                <Typography
                  className={classes.countdown}
                  align="center"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  You Solved The Problem
                </Typography>
              )}
            </Paper>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" className={classes.heading}>
                      Coding Instructions
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{instructions}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item xs={6}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" className={classes.heading}>
                      Shared Room ID
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      Your Partner Must Have The Same Room ID
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{id}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="room">
              <Grid item xs={8} pr={0}>
                <React.Fragment>
                  <AceCodeEditor
                    code={code}
                    onChange={this.onChange}
                    role={profile.role}
                    start={start}
                  />

                  <Button
                    type="submit"
                    name="action"
                    fullWidth
                    onClick={e => this.handleOnRun(e, code, name)}
                    variant="outlined"
                    color="primary"
                    className={classes.btn}
                  >
                    RUN
                  </Button>
                </React.Fragment>
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
                  <RoomResults result={result} />
                </Box>
                <Button
                  type="button"
                  onClick={this.redirectToTarget}
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  className={classes.btn}
                >
                  BAIL
                </Button>
              </Grid>
            </Grid>
          </Container>
          {/* <UserEntrySnackbar visible={visible} /> */}
        </React.Fragment>
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
