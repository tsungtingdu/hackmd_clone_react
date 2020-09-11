import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import './css/index.scss'
import configStore from './store'

const store = configStore()

ReactDOM.render(<Router store={store} />, document.getElementById('root'))
