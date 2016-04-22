import { getIdIndex } from '../reducers/search_info'
import { getIdIndexUser, isUserGoing } from '../reducers/user_info'
import { postApi, getApi } from '../api-methods'

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
			// if not, add attendee to user's places
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

function remove_attendee(index){
	return {
		type: 'REMOVE_ATTENDEE',
		index: index
	}
}

export function mark_attending(id,user) {
	return (dispatch, getState) => {
		dispatch(try_add_attendee(id,user))
	}
}

export function try_remove_attendee(id,user){
	return (dispatch, getState) => {
	// find index of id 
	const index = getIdIndexUser(getState().user_info, id)
	dispatch(remove_attendee(index))
	// and also add it on database
	const body = {
		id: id,
		user: user
	}
	postApi('api/remove',body)
	}
}

export function mark_remove(id,user) {
	return (dispatch, getState) => {
		dispatch(try_remove_attendee(id,user))
	}
}




