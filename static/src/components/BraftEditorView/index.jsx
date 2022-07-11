import React, { memo, useCallback, useLayoutEffect, useRef } from 'react';
import 'braft-editor/dist/index.css';

import { buildPreviewHtml } from './util'

import './style.less';

const BraftEditorView = memo((props) => {
  const { editorState } = props;

  const iframeRef = useRef(null);
  const html = buildPreviewHtml(editorState);

  return (
    <div
      className="braft-editor-view"
      style={props.style}
    >
      <iframe
        ref={iframeRef}
        srcDoc={html}
        onLoad={() => {
          const ele = iframeRef.current
          const obj = ReactDOM.findDOMNode(ele);
          const height = obj.contentWindow.document.body.scrollHeight
          ele.height = height
        }}
        width="100%"
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
  )
})

export default BraftEditorView
