import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Editor from 'for-editor'
import Navbar from '../components/Navbar'
import LoadingMask from '../LoadingMask'
import { saveToLocal } from '../apis/postApi'
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

const placeholder = '# Put your note title here'

const EditorPage = () => {
  const [input, setInput] = useState()
  const dispatch = useDispatch()
  let post = useSelector((state) => state.post)
  post = post.post && post.post.Post ? post.post.Post : {}

  const handleChange = (e) => {
    setInput(e)
    saveToLocal({ id: post.id, content: input })
  }

  const handleSave = () => {
    const data = { id: post.id, content: input }
    dispatch({
      type: 'SAVE_POST_REQUEST',
      data,
    })
  }

  useEffect(() => {
    if (post) {
      setInput(post.content)
      saveToLocal({ id: post.id, content: input })
    }
  }, [post])

  return (
    <Fragment>
      <LoadingMask />
      <Navbar />
      <Editor
        value={input}
        height="calc(100vh - 50px)"
        onChange={handleChange}
        onSave={handleSave}
        subfield
        preview
        toolbar={toolbar}
        placeholder={placeholder}
        language="en"
      />
    </Fragment>
  )
}

export default EditorPage
