const initial_state = {
	user_name: undefined,
	places_attending: []
}

export function user_info(state=initial_state,action) {
	switch (action.type) {
		case 'ADD_ATTENDEE':
			var places_attending_copy = state.places_attending.slice(0)
			places_attending_copy.push({
				business: action.result.business,
				id: action.id
			})
			return Object.assign({},state,{
				places_attending: places_attending_copy
			})
		case 'RECEIVE_USER_PLACES':
			return Object.assign({},state,{
				places_attending: action.places
			})
		case 'SIGN_IN':
			return Object.assign({},state, {
				user_name: action.user_name
			})
		default:
			return state
	}
}

export function isUserGoing(state,id) {
	var matches = state.places_attending.filter(place=>{
		if (place.id === id) {
			return true
		}
	})
	return matches.length > 0
}

	

