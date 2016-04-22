const initial_state = {
	results: [],
	request_status: 'QUIET'
}

export function search_info(state=initial_state,action) {
	switch (action.type) {
		case 'REQUEST_RESULTS':
			return Object.assign({},state,{
				request_status: 'REQUESTING_RESULTS'
			})
		case 'RECEIVE_RESULTS':
			return Object.assign({},state,{
				request_status: 'QUIET',
				results: action.results
		})
		case 'DID_NOT_RECEIVE_RESULTS':
			return Object.assign({},state,{
				request_status: 'QUIET'
			})
		// loop through all the places user is viewing, and if id matches the 
		// update place, update its value
		case 'UPDATE_PLACES':
		console.log(action.updated_place)
		 	var ind = state.results.map(result=>{
		 				return result.id
		 		}).indexOf(action.updated_place.id)
		 	if (ind === -1 ) return state
		 	var results_copy = state.results.slice(0)
		 	var result = results_copy[ind]
		 	results_copy[ind] = Object.assign({},result,{
		 		num_attending: action.updated_place.attending
		 	})
			return Object.assign({},state,{
				results: results_copy
			})
		default:
			return state
	}
}

export function getIdIndex(state,id) {
	var results = state.results
	var index = results.findIndex(result=>{
		if (result.id === id) {
			return true
		}
		else {
			return false
		}
	})
	return index
}
