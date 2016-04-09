import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
var PORT = require("../port_config.json").server_port;
import routes from './routes/index'
import reducers from './reducers';
import { update_places } from './actions'

const middleware = [ thunk, logger() ];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

const socket = io('http://localhost:' + PORT + '/');

socket.on('places_attending_updated', function(updated_place) {
    store.dispatch(update_places(updated_place))
});

export default class App extends Component {
  render() {
    return (
	<Provider store={store}>
	<Router history={browserHistory}>
		{ routes }
	</Router>
	</Provider>
    );
  }
}
