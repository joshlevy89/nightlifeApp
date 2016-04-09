var PORT = Number(process.env.PORT || 3000);
var base_url = 'http://localhost:' + PORT + '/'

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
		var url = base_url + action
		return fetch(url)
}