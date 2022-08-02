// /* managerExpense.js */

// import { customiseNavbar } from '../util.js'

// export async function setup(node) {
// 	console.log('HOME: setup')
// 	try {
// 		console.log(node)
// 		document.querySelector('header p').innerText = 'Home'
// 		customiseNavbar(['home']) // navbar if logged in
// 		const token = localStorage.getItem('authorization')
// 		console.log(token)
// 		if(token === null) customiseNavbar(['getExpenses']) //navbar if logged out
// 		// add content to the page
// 		await addContent(node)
// 	} catch(err) {
// 		console.error(err)
// 	}
// }

// // this example loads the data from a JSON file stored in the uploads directory
// async function addContent(node) {
//  	const token = localStorage.getItem('authorization')

// 		const url = '/api/managerExpense'
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/vnd.api+json',
//    'authorization' : token
// 		}
// 	}
// 	const response = await fetch(url, options)
// 	const data = await response.json()
// 	const template = document.querySelector('template#managerExpense')
//  //console.log("HEREEEEEEEEEEE:")
//  console.log(data)


// for(const expense of data){
// 	const fragment = template.content.cloneNode(true)

// 	let expense = fragment.getElementById("expenses")
//  expenseName.innerText = expense.ExpenseName

//  let total= fragment.getElementById("expense_total")
//  total.innerText = expense.total

//  // // let period= fragment.getElementById("period")
//  // //  period.innerText = expense.period

//  // let period= fragment.getElementById("date_created")
//  // date_created.innerText = expense.date_created

//  // let amount= fragment.getElementById("amount")
//  // amount.innerText = expense.amount

// 	// let img = fragment.querySelector('img')
// 	// img.src = `${window.location.origin}/uploads/${expense.picture_name}`

// 		node.appendChild(fragment)
// }
