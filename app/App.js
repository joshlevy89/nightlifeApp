import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import routes from './src/routes/index'
import reducers from './src/reducers';
import { update_places } from './src/actions';

const middleware = [ thunk, logger() ];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

var isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
	//var socket = io('https://my-stock-watcher.herokuapp.com/' + process.env.PORT + '/');
	var socket = io('http://localhost:' + 3000 + '/')
}
else {
 	var socket = io('http://localhost:' + 3000 + '/')
}	   

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
