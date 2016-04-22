import { postApi, getApi } from '../api-methods'


function request_results() {
	return {
		type: 'REQUEST_RESULTS'
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

export function receive_results(results) {
	return {
		type: 'RECEIVE_RESULTS',
		results: results
	}
}
