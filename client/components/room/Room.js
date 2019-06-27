import React from 'react'
import AceEditor from 'react-ace'
import WebWorker from '../../workers/WebWorker'
import twoSumWorker from '../../workers/twoSumWorker'

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      worker: twoSumWorker,
      code:
        '//Write a function to sum two numbers\nfunction twoSum (a,b){\n \n}'
    }
    this.handleOnRun = this.handleOnRun.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleOnRun() {
    this.worker = new WebWorker(this.state.worker)
    this.worker.postMessage({code: this.state.code})
    this.worker.addEventListener('message', e => {
      console.log(e.data)
    })
    setTimeout(() => this.worker.terminate(), 10000)
  }

  onChange(newValue) {
    this.setState({code: newValue})
  }
  render() {
    return (
      <div>
        {' '}
        Get Into The Rhythm:
        <AceEditor
          mode="javascript"
          theme="solarized_dark"
          onChange={this.onChange}
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
          height="400px"
          value={this.state.code}
        />
        <button type="submit" name="action" onClick={this.handleOnRun}>
          RUN
        </button>
      </div>
    )
  }
}

export default Room
