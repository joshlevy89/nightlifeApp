import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import routes from './routes/index'
import reducers from './reducers';
import { update_places } from './actions'
var PORT = Number(process.env.PORT || 3000);


const middleware = [ thunk, logger() ];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);
if (PORT === 3000) {
	console.log('the port is equal to ' + PORT)
const socket = io('http://localhost:' + PORT + '/');
}
else {
console.log('A WHOLE OTHER PORT IS HIT AND IT IS: ' + PORT)
const socket = io('https://joshlevy89-nightlife-app.herokuapp.com/' + PORT + '/');	
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
