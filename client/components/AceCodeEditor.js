import React from 'react'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'

export const AceCodeEditor = props => {
  const {role, start} = props
  let readOnly = role !== 'driver' || !start
  return (
    <AceEditor
      mode="javascript"
      theme="solarized_dark"
      onChange={props.onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{$blockScrolling: true}}
      enableLiveAutocompletion={true}
      enableBasicAutocompletion={true}
      fontSize={16}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      wrapEnabled={true}
      width="100%"
      height="85%"
      value={props.code}
      readOnly={readOnly}
    />
  )
}
