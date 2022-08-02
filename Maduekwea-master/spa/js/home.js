
/* home.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'addExpense', 'getExpenses', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
		// add content to the page
		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}





//this example loads the data from a JSON file stored in the uploads directory
async function addContent(node) {
	//const response = await fetch('/uploads/quotes.json')

	const response = await fetch(url, options)
	const quotes = await response.json()
	const template = document.querySelector('template#quote')
	for(const user of data) {
		const fragment = template.content.cloneNode(true)
		// fragment.getElementById('h2').innerText = 
		fragment.querySelector('p').innerText = quote.quotes
		node.appendChild(fragment)
	}
}
