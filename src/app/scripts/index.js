import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Container } from './components';

import { bindWindowMessageToStore } from './messageHandler';

import '../styles/style.scss';

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}> 
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)

const middleware = [thunk];
const enhancers = [DevTools.instrument()];
const devToolsExtension = window.devToolsExtension
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}

const store = createStore(
    reducer,
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
)

const history = syncHistoryWithStore(hashHistory, store);

bindWindowMessageToStore(store);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="reader/:id" component={Container}/>
                </Route>
            </Router>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('root')
)
