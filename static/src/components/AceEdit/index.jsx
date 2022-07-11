import React from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow';

export default ({value, onChange, onBlur}) => {
  return <AceEditor
    // ref={aceRef}
    theme="tomorrow"
    name="SETTING_CONFIG"
    value={value}
    mode="json"
    fontSize={14}
    onChange={onChange}
    onBlur={onBlur}
    style={{ width: '100%', height: '400px' }}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      tabSize: 2
    }}
  />
}