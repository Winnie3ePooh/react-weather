import React from 'react'
import ReactDOM from 'react-dom'

import MainPage from './scenes/MainPage/MainPage'
require('./index.css')

class App extends React.Component {
  render () {
    return (
      <MainPage />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
