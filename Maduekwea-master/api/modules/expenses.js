import { db } from './db.js'
import {saveFile} from './util.js'


export async function getAllExpenses() {
    console.log("FUNCTION / getAllExpenses DB")
    try{
                   
        const sql = `SELECT ExpenseID,ExpenseName,amount,description,period,picture_name FROM expenses ORDER BY period;`
        const allExpenses = await db.query(sql)
        console.log("data in all expenses:")
        console.log(allExpenses)
        if(allExpenses.length == 0){
            return JSON.stringify("")
        }
        return allExpenses
    }catch(err){
        console.log(err.message)
    }
}

export async function addExpense(data,username) {
    try{
        console.log("Adding to DB")
        const  sql= `SELECT id FROM accounts WHERE user = "${username}"`
        let getUserID = await db.query(sql)
        console.log(getUserID)
        const img_name = saveFile(data.file.base64, username)
        console.log('the ID for user ' + username + ' is : ' + getUserID[0].id)
        const date = new Date()

        const day = date.getDate()
        const  month = date.getMonth()+1
        const year = date.getFullYear()
        const new_date = year + '-'+month+'-'+day
        //const new_date = day + '-'+month+'-' + year
        console.log (new_date)
        const sql2 = `INSERT INTO expenses(ExpenseName, period,date_created,amount,description,category,approval,userID,picture_name) VALUES("${data.Expense}", "${data.period}","${new_date}","${data.amount}","${data.description}","${data.category}","not-approved","${getUserID[0].id}","${img_name}")`
        await db.query(sql2)
        return true
    }catch(err){
        console.log(err.message)
    }
}


// export async function deleteExpense() {
//     console.log("FUNCTION / deleteAnExpense DB")
//     try{
                   
//         const sql = `SELECT ExpenseName,amount,description,period,picture_name FROM expenses ORDER BY expense;`
//         const allExpenses = await db.query(sql)
//         console.log("data in all expenses:")
//         console.log(deleteExpense)
//         if(allExpenses.length == 0){
//             return JSON.stringify("")
//         }
//         // for (const expense of allExpenses){
//         //     expense.categories = [] //empty array to store all category from expense
             
//         //     const categorysql = `SELECT category FROM expense WHERE id = "${expense.expenseID}"`;
//         //     const category = await db.query(sql)
//         //     if(category){
//         //         expense.category.push(category)
        
//         //     }
            
//         // }
//         return deleteExpense
//     }catch(err){
//         console.log(err.message)
//     }
// }

export async function expenseDetail(ExpenseID) {
    try{
        const sql2 = `SELECT * FROM expenses WHERE ExpenseID = "${ExpenseID}"`
        const data =  await db.query(sql2)
        console.log("Detials of a SINGLE EXPENSE")
        console.log(data)
        return data[0]

    }catch(err){
        console.log(err.message)
    }
}






export default {addExpense}
