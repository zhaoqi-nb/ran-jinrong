export const previewEditor = (editorState) => {
  return buildPreviewHtml(editorState)
}

export const buildPreviewHtml = (editorState) => {

  return `
      <!Doctype html>
      <html>
        <head>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 0px 0px;
              overflow: hidden;
              background-color: #fff;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div id="view-container" class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `

}
