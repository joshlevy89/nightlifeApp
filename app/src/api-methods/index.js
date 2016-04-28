var base_url = '/';


export function postApi(action,body) {
		var url = base_url + action
		return (fetch(url, {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		}))
}

export function getApi(action) {
		console.log('About to fetch')
		var url = base_url + action
		console.log(url)
		return fetch(url)
}