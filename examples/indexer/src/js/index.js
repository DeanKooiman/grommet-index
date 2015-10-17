// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import 'index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import Rest from 'grommet/utils/Rest'
import RestWatch from 'grommet-index/utils/RestWatch'
//var Locale = require('grommet/utils/Locale');
import Routes from './Routes'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { Provider } from 'react-redux'
// TODO: Use IntlProvider, wasn't working
import { IntlProvider } from 'react-intl';

import store from './store'
import history from './indexerHistory'
import { init, routeChanged, dashboardLoad } from './actions'

// The port number needs to align with devServerProxy and websocketHost in gulpfile.js
let hostName = NODE_ENV === 'development' ? 'localhost:8010' : window.location.host

RestWatch.initialize('ws://' + hostName + '/rest/ws')

Rest.setHeaders({
  'Accept': 'application/json',
  'X-API-Version': 200
})

// From a comment in https://github.com/rackt/redux/issues/637
// this factory returns a history implementation which reads the current state
// from the redux store and delegates push state to a different history.
let createStoreHistory = () => {
  return {
    listen: (callback) => {
      // subscribe to the redux store. when `route` changes, notify the listener
      let notify = () => {
        const route = store.getState().route
        if (route) {
          callback(route)
        }
      }
      const unsubscribe = store.subscribe(notify)

      return unsubscribe;
    },
    createHref: history.createHref,
    pushState: history.pushState
  }
}

let element = document.getElementById('content')

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router routes={Routes.routes} history={createStoreHistory()} />
    </Provider>
  {/*}
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  {*/}
  </div>
), element)

document.body.classList.remove('loading')

let localStorage = window.localStorage;
// init from localStorage
store.dispatch(init(localStorage.email, localStorage.token))

// check for session
let sessionWatcher = () => {
  const {route, session} = store.getState()
  if (route) {
    if (route.pathname === '/login' && session.token) {
      localStorage.email = session.email
      localStorage.token = session.token
      history.pushState(null, '/dashboard') // TODO: remember initial URL to restore it
    } else if (route.pathname !== '/login' && ! session.token) {
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      history.pushState(null, '/login')
    } else if (route.pathname === '/') {
      history.replaceState(null, '/dashboard')
    }
  }
}
store.subscribe(sessionWatcher)

// listen for history changes and initiate routeChanged actions for them
const unlisten = history.listen(function (location) {
  store.dispatch(routeChanged(location))
})
