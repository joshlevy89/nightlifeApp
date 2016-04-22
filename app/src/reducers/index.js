import { combineReducers } from 'redux'
import { search_info } from './search_info'
import { user_info } from './user_info'

export default combineReducers({
	search_info,
	user_info
})