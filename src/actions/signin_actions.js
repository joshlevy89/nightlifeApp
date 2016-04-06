import { postApi, getApi } from '../api-methods'
import { browserHistory } from 'react-router'

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


