import React, { useState, Fragment } from 'react'
import Navbar from '../conponents/Navbar'
import Editor from 'for-editor'
import '../css/editor.scss'

const toolbar = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  img: true,
  link: true,
  code: true,
  preview: true,
  expand: false,
  undo: true,
  redo: true,
  save: false,
  subfield: true,
}

const styledEditor = {

}

const EditorPage = () => {
  const [content, setContent] = useState('')
  const handleChange = (e) => {
    setContent(e)
  }
  return (
    <Fragment>
      <Navbar></Navbar>
      <Editor
        value={content}
        height="calc(100vh - 50px)"
        onChange={handleChange}
        subfield={true}
        preview={true}
        style={styledEditor}
        toolbar={toolbar}
        placeholder="# Put your note title here"
        language="en" />
    </Fragment>
  )
}

export default EditorPage;
