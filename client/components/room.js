import React from 'react'
import AceEditor from 'react-ace'
import WebWorker from '../workers/WebWorker'
import twoSumWorker from '../workers/twoSumWorker'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
// Material UI Dependencies
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class Room extends React.Component {
  constructor(props) {
    super(props)
    // this.room = db.collection('rooms')

    this.state = {
      // worker: twoSumWorker,
      code: '',
      result: ''
    }
    this.redirectToTarget = this.redirectToTarget.bind(this)
  }

  // this.handleOnRun = this.handleOnRun.bind(this)
  // this.onChange = this.onChange.bind(this)

  // onChange = async newValue => {
  //   await this.room.doc('1').set({
  //     code: newValue
  //   })
  //   this.setState({...this.state, code: newValue})
  // }

  // componentDidMount = async () => {
  //   await this.room.doc('1').onSnapshot(doc => {
  //     const data = doc.data().code || this.state.code
  //     const result = doc.data().result
  //     this.setState({...this.state, code: data, result: result})
  //   })
  // }

  // handleOnRun = () => {
  //   this.worker = new WebWorker(this.state.worker)
  //   this.worker.addEventListener('message', async e => {
  //     await this.room.doc('1').set({
  //       result: e.data + ''
  //     })
  //     this.setState({...this.state, result: e.data})
  //   })

  //   this.worker.postMessage({code: this.state.code})

  //   //Terminate worker after 10s
  //   setTimeout(() => this.worker.terminate(), 10000)
  //   // this.setState({
  //   //   worker: twoSumWorker,
  //   //   code:
  //   //     '//Write a function to sum two numbers\nfunction twoSum (a,b){\n \n}',
  //   //   result: ''
  //   // })
  // }
  redirectToTarget = () => {
    this.props.history.push(`/home`)
  }

  render() {
    let name = this.props.match.params.name
    let id = this.props.match.params.id

    let instructions
    this.props.rooms
      ? (instructions = this.props.rooms[id].instructions + ':')
      : (instructions = 'loading')
    console.log('instructions', instructions)
    return (
      <Container>
        <div>
          <Typography component="h2" variant="h5">
            Get Into The Rhythm:
          </Typography>
          <Typography component="h1" variant="h5">
            {name}
          </Typography>
          <AceEditor
            mode="javascript"
            // theme="solarized_dark"
            // onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            enableLiveAutocompletion={true}
            enableBasicAutocompletion={true}
            defaultValue={this.state.code}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            width="100%"
            height="200px"
            value={instructions}
          />
          <Button
            type="submit"
            name="action"
            onClick={this.handleOnRun}
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
          <Typography component="h5" variant="h5">
            Results: {this.state.result}
          </Typography>
        </div>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    rooms: state.firestore.data.rooms
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: 'rooms'}])
)(Room)
