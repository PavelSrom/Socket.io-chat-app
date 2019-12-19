import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./containers/Home"
import Chat from "./containers/Chat"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  )
}

export default App
