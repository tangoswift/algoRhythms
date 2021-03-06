import React from 'react'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export const AceCodeEditor = props => {
  const {role, start, onChange} = props
  let readOnly = role !== 'driver' || !start
  let code = props.code
  code = code.replace(/\\n/g, '\n')
  code = code.replace(/\\t/g, '\t')

  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={onChange}
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
      height="100%"
      value={code}
      readOnly={readOnly}
    />
  )
}
