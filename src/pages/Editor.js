import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../conponents/Navbar'
import { saveToLocal } from '../apis/postApi'
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
  save: true,
  subfield: true,
}

const placeholder = "# Put your note title here"

const EditorPage = (props) => {
  const dispatch = useDispatch()
  const post = useSelector(state => state.post.data)
  const [input, setInput] = useState()

  const handleChange = (e) => {
    setInput(e)
    saveToLocal({ id: post.id, title: '', content: input })
  }

  const handleSave = () => {
    const data = { id: post.id, title: '', content: input }
    dispatch({
      type: "SAVE_POST_REQUEST",
      data
    })
  }

  useEffect(() => {
    if (post) {
      setInput(post.content)
      saveToLocal({ id: post.id, title: '', content: input })
    }
  }, [post]);

  return (
    <Fragment>
      <Navbar></Navbar>
      <Editor
        value={input}
        height="calc(100vh - 50px)"
        onChange={handleChange}
        onSave={handleSave}
        subfield={true}
        preview={true}
        toolbar={toolbar}
        placeholder={placeholder}
        language="en" />
    </Fragment>
  )
}

export default EditorPage;
