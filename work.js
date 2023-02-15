// import utils from "./utils.js"
// import bank from "./bank.js"

// let salary = 0
// let currentLoan = bank.returnLoanAmount()
// console.log(currentLoan);
// let balance = 0//get balance
// const workText = document.getElementById("work-text")

// const workButtonsDiv = document.getElementById("work-buttons")
// const bankerDiv = document.getElementById("banker-div")
// const balanceText = document.getElementById("balance-text")
// const loanText = document.getElementById("loan-text")
// const bankerButton = document.getElementById("banker-button")
// const workButton = document.getElementById("work-button")
// const storeButton = document.getElementById("store-button")
// const repayButton = document.getElementById("repay-button")

// function getSalary() {
//     console.log(currentLoan);
//     salary = +salary + 100
//     workText.innerText = "Pay: " + utils.formatNumber(salary)
// }

// function depositSalary() {
//     if (currentLoan > 0) {
//         //check if we are over depositing
//         if (+currentLoan - (0.1 * +salary) < 0) {
//             console.log((+currentLoan - (0.1 * +salary)))
//             balance = +balance + +salary - +currentLoan
//             currentLoan = 0
//             //otherwise normal depoist
//         } else {
//             balance = +balance + (0.9 * +salary)
//             currentLoan = +currentLoan - (0.1 * +salary)
//         }
//         //if no loan, just deposit
//     } else {
//         balance = +balance + +salary
//     }
//     //salary = 0 again after depositing
//     salary = 0

//     //render page
//     workText.innerText = "Pay: " + utils.formatNumber(salary)
//     balanceText.innerText = "Balance: " + utils.formatNumber(balance)
//     loanText.innerText = "Currently have " + utils.formatNumber(currentLoan) + " outstanding."
//     //render for the loan button & repay button
//     checkLoan()
// }

// //Function that checks if a loan is payed off and renders the page accordingly
// function checkLoan() {
//     if (currentLoan <= 0) {
//         loanText.innerText = " "
//         bankerDiv.appendChild(bankerButton)
//         repayButton.remove()
//     }
// }

// //Function to allow a user to repay a loan instead of banking the salary
// //If a user is overpaying on the loan, store the rest of the money in the bank balance
// //Reset the salary, render the page accordingly
// function repayLoan() {
//     //get what you store as balance
//     if (+salary - +currentLoan > 0) {
//         balance += +salary - +currentLoan
//         currentLoan = 0
//     }
//     else {
//         currentLoan = +currentLoan - +salary
//     }
//     salary = 0
//     workText.innerText = "Pay: " + utils.formatNumber(salary)
//     balanceText.innerText = "Balance: " + utils.formatNumber(balance)
//     loanText.innerText = "Currently have " + utils.formatNumber(currentLoan) + " outstanding."
//     checkLoan()
// }

// const work = {
//     getSalary,
//     depositSalary,
//     checkLoan,
//     repayLoan

// }

// export default work