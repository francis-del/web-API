
/* getExpenses.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'foo', 'addExpense', 'expenseDetail']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
		// add content to the page
		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}

// this example loads the data from a JSON file stored in the uploads directory
async function addContent(node) {
 	const token = localStorage.getItem('authorization')

		const url = '/api/getExpenses'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
   'authorization' : token
		}
	}
	const response = await fetch(url, options)
	const data = await response.json()
	const template = document.querySelector('template#getExpenses')
 console.log("HEREEEEEEEEEEE:")
 console.log(data)


for(const expense of data){
	const fragment = template.content.cloneNode(true)

	

	let expenseName = fragment.getElementById("expenseName")
 expenseName.innerText = expense.ExpenseName

 let shortline= fragment.getElementById("shortline")
 shortline.innerText = expense.description

 let period= fragment.getElementById("period")
  
	const text = expense.period
		const new_period = text.split("-")
		console.log(new_period)
		const day = new_period[2]
		const month = new_period[1]
		const year = new_period[0]

		const new_date = day + '-' + month + '-' + year

		period.innerText = new_date

 let amount= fragment.getElementById("amount")
 amount.innerText = expense.amount

	let img = fragment.querySelector('img')
	img.src = `${window.location.origin}/uploads/${expense.picture_name}`

	let link = fragment.querySelector('a')
	link.innerText = "All details"
	link.href = `/expenseDetail_${expense.ExpenseID}`

	node.appendChild(fragment)
}


	// for(const quote of quotes.data) {
	// 	const fragment = template.content.cloneNode(true)
	// 	fragment.querySelector('h2').innerText = quote.author
	// 	fragment.querySelector('p').innerText = quote.quote
	// 	node.appendChild(fragment)
	// }
}