import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
import { browserHistory } from 'react-router'
import { postApi, getApi } from '../api-methods'
import { getIdIndex } from '../reducers/search_info'
import { isUserGoing } from '../reducers/user_info'

// SPLIT THIS INTO ONE FILE ******************
function request_results() {
	return {
		type: 'REQUEST_RESULTS'
	}
}

function receive_results(results) {
	return {
		type: 'RECEIVE_RESULTS',
		results: results
	}
}

function did_not_receive_results() {
	return {
		type: 'DID_NOT_RECEIVE_RESULTS'
	}
}

export function search_yelp(location) {
	return (dispatch) => {
		dispatch(request_results())
		const body = {
			location: location
		}
		postApi('api/search',body)
		.then(response => response.json())
      	.then(json => { 
	      	if (json.message === 'RESULTS_RECEIVED') {
	      		console.log(json.results)
	        dispatch(receive_results(json.results))
	    	}
	    	else if (json.message === 'NO_RESULTS_RECEIVED') {
	    	alert('No results were received. Check your spelling.')
	    	dispatch(did_not_receive_results())
	    	}
    	}
      )
	}
}
// ******************************************************

// AND SPLIT THIS INTO ANOTHER FILE *********************
//increment the attendee count for the event
// ...and add to the list of places attending (listed as id)
function add_attendee(index,id,user,result){
	return {
		type: 'ADD_ATTENDEE',
		index: index,
		id: id,
		user: user,
		result
	}
}

function try_add_attendee(id,user){
	return (dispatch, getState) => {
	if (user===undefined) {
		alert('You must be logged in to attend events!')
		return 
	}
	// find index of id 
	const index = getIdIndex(getState().search_info, id)
	// check if this id is already in user's list of places attending
	if (isUserGoing(getState().user_info,id)) {
		// if so, alert user that is already attending
		alert('You are already attending that event')
	}
	else {
	// if not, add attendee on client
	var result = getState().search_info.results[index]; 
	dispatch(add_attendee(index,id,user,result))
	// and also add it on database
	const body = {
		user: user,
		result: result
	}
	postApi('api/add',body)
	}
	}
}

export function mark_attending(id,user) {
	return (dispatch, getState) => {
		dispatch(try_add_attendee(id,user))
	}
}

// this is triggered when socket io notices that someone
// has indicated he/she is going to something. when this happens,
// need to update only the places the user is currently viewing.
export function update_places(updated_place) {
	return {
	type: 'UPDATE_PLACES',
	updated_place: updated_place
	}
}

// ANOTHER SPLIT ****************************************
export function receive_user_places(places_user_attending) {
	return {
		type: 'RECEIVE_USER_PLACES',
		places: places_user_attending
	}
}

export function authenticate() {
	getApi('auth/twitter')
}

export function signin_success(user_name) {
	return {
	type: 'SIGN_IN',
	user_name: user_name
	}
}

export function signin(user_name) {
	return (dispatch) => {
	const body = {
		user_name: user_name,
	}
	postApi('api/signin',body)
	.then(function(response) {
	    return response.json();
	})
	.then(function(data) {
		if (data.message === 'signin_successful') {
			browserHistory.push('/search')
			dispatch(receive_user_places(data.places_user_attending))
			dispatch(signin_success(user_name))
		}
	})
	}
}
// ******************************************************


