import React from 'react'
import ReactDOM from 'react-dom'

import { Popular } from './Popular'
import { Nav } from './Nav'
import { Home } from './Home'
import { Battle } from './Battle'
import { Results } from './Results'

var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch

export class App extends React.Component {
  render() {
    return(
      <Router>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/popular' component={Popular} />
          <Route path='/battle/results' component={Results} />
          <Route render={function () {
            return (
              <h1>Not Found</h1>
            )
          } } />
        </Switch>
      </div>
      </Router>
     )
  }
}
