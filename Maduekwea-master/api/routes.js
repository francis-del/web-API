
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'

import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import {addExpense, getAllExpenses, expenseDetail} from './modules/expenses.js'
const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
})


// adding an expense
router.post('/api/expenses/add', async context => {
 console.log('POST /api/expenses/add')
 const token = context.request.headers.get('Authorization')
 const {user, password} = extractCredentials(token)
 //console.log(`auth: ${token}`)
 try {
  console.log("hi")
  const credentials = extractCredentials(token)
  const { user, pass } = credentials
  console.log('username is : ' + user)
  const body = await context.request.body()
  const data = await body.value
 console.log("SAVING FILE:")
 saveFile(data.file.base64,user)
  console.log("Data going into the SQL database : ")
  console.log(data)
  await addExpense(data,user)
  }catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})

//getting all expenses added to the database
router.get('/api/getExpenses', async context => {
 console.log('GET /api/getExpenses')
 const token = context.request.headers.get('Authorization')
 const {user, password} = extractCredentials(token)
 try {
  console.log("hi")
  const credentials = extractCredentials(token)
  const { user, pass } = credentials
  console.log('username is : ' + user)
 console.log("getting all expense")
 const data = await getAllExpenses()
 context.response.body = JSON.stringify(data, null, 2)
 } catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})

router.put('/api/expenses', async context => {
 console.log('PUT /api/expenses')
 try {
  const token = context.request.headers.get('Authorization')
  console.log(`auth: ${token}`)
  //const body  = await context.request.body()
  //const data = await body.value
  console.log("Updating a single expense")
  //saveFile(data.base64, data.user)
  //context.response.status = 201

  context.response.body = JSON.stringify ({
   "expenses": [
    {
    "ExpensesDate": "20.02.2022",
    "expensesName": "Frozen Food",
    "CategoryID": "Food"
    }
   ]
  })
 } catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})

//Deleting an expense from the database
router.delete('/api/expense/delete', async context => {
 console.log('DELETE /api/expense')
 const token = context.request.headers.get('Authorization')
  console.log(`auth: ${token}`)
 try {
  // const token = context.request.headers.get('Authorization')
  // console.log(`auth: ${token}`)
  //const body  = await context.request.body()
  //const data = await body.value
  console.log("deleting an expense")
  context.response.body = JSON.stringify ({
   "expense": [
   {
    success: true,
    msg: "Expense removed"
   }
   ]
  })
  console.log(data)
 } catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})

//getting all expenses added to the database
router.get('/api/expenseDetail/:id', async context => {
 const id = context.params.id
 console.log('GET /api/expenseDetail')
 const token = context.request.headers.get('Authorization')
 const {user, password} = extractCredentials(token)
 try {
  //console.log("hi")
  const credentials = extractCredentials(token)
  const { user, pass } = credentials
  console.log('username is : ' + user)
 console.log("getting an expense detail")

 const data = await expenseDetail(id)
 console.log(data)
 context.response.body = JSON.stringify(data, null, 2)
 } catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})



router.get("/(.*)", async context => {      
// 	const data = await Deno.readTextFile('static/404.html')
// 	context.response.body = data
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

export default router

