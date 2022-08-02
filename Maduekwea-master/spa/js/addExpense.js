

/* addExpense.js */

import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('AddExpense: setup')
	try {
		const token = localStorage.getItem('authorization')
		console.log(node)
		document.querySelector('header p').innerText = 'Add a new Expense'
		customiseNavbar(['home','getExpenses'])
		const paragraph = node.querySelector('p')
		//paragraph.innerText = "text changed"
		const button = node.getElementById('addExpense')

	button.addEventListener('submit', async ()=>{
				event.preventDefault()
				const formData = new FormData(event.target)
				const data = Object.fromEntries(formData.entries())
				//console.log(data)
				const file = document.querySelector('input[name="file"]').files[0]
				data.file.base64 = await file2DataURI(file)
				console.log("BASE64 HERE:")
				console.log(data.file)
				const url = '/api/expenses/add'
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/vnd.api+json',
						'Authorization': token
					},
					body: JSON.stringify(data)
				}
				const response = await fetch(url, options)
				const json = await JSON.stringify(response)
				console.log(json)
				showMessage('new expenses added')
				loadPage('addExpense')
					
	})



		if(localStorage.getItem('authorization') === null) loadPage('AddExpense')
		// there is a token in localstorage
		//node.querySelector('form').addEventListener('submit', await uploadData)
	} catch(err) {
		console.error(err)
	}
}

async function AddExpense() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const url = '/api/getExpenses'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	showMessage('new expenses added')
	loadPage('addExpense')
}


