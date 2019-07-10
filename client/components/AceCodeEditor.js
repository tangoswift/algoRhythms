import React from 'react'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'

export const AceCodeEditor = props => {
  const {role, start, onChange} = props
  let readOnly = role !== 'driver' || !start
  let code = props.code.replace(
    '{}',
    '{\n\t// please enter your code inside the curly braces\n}'
  )

  return (
    <AceEditor
      mode="javascript"
      theme="solarized_dark"
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
      height="85%"
      value={code}
      readOnly={readOnly}
    />
  )
}
