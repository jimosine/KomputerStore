//IMPORTS
import utils from "./utils.js"
import bank from "./bank.js"

//VARIABLES
let salary = 0

//HTML ELEMENTS
const workText = document.getElementById("work-text")
const bankerDiv = document.getElementById("banker-div")
const bankerButton = document.getElementById("banker-button")
const repayButton = document.getElementById("repay-button")


//Function to increase a user's salary by 100 and rerenders the salary 
//Runs when "work" button is clicked
function getSalary() {
    salary = +salary + 100
    displaySalary()
}

//Function to deposit one's salary into the bank.
//If there is a loan oustanding, 10% of the salary goes to the loan payment
//However, if the outstanding loan is smaller than the 10% of the salary, just pay 
//the outstanding amount and store the rest in the bank balance.
//Stores the rest of the 90% in the bank balance, or 100% if no loan is oustanding.
//Resets the salary to 0, and rerenders the corresponding texts
function depositSalary() {
    let currentLoan = bank.returnLoanAmount()
    let balance = bank.getBalance()
    if (currentLoan > 0) {
        //check if we are over depositing
        if (+currentLoan - (0.1 * +salary) < 0) {
            bank.setBalance(+balance + +salary - +currentLoan)
            bank.setLoan(0)
            //otherwise normal depoist
        } else {
            bank.setBalance(+balance + (0.9 * +salary))
            bank.setLoan(+currentLoan - (0.1 * +salary))
        }
        //if no loan, just deposit
    } else {
        bank.setBalance(+balance + +salary)
    }
    //salary = 0 again after depositing
    salary = 0

    //render page
    displaySalary()
    bank.displayBalance()
    bank.displayLoan()
    //render for the loan button & repay button
    checkLoan()
}

//Function that checks if a loan is payed off and renders the page accordingly
function checkLoan() {
    let currentLoan = bank.returnLoanAmount()
    if (currentLoan <= 0) {
        bank.displayLoan()
        bankerDiv.appendChild(bankerButton)
        repayButton.remove()
    }
}

//Function to allow a user to repay a loan instead of banking the salary
//If a user is overpaying on the loan, store the rest of the money in the bank balance
//Reset the salary, render the page accordingly
function repayLoan() {
    let currentLoan = bank.returnLoanAmount()
    let balance = bank.getBalance()
    //get what you store as balance
    if (+salary - +currentLoan > 0) {
        bank.setBalance(balance + salary - currentLoan)
        bank.setLoan(0)
    }
    else {
        bank.setLoan(currentLoan - salary)
    }
    salary = 0
    displaySalary()
    bank.displayBalance()
    bank.displayLoan()
    checkLoan()
}

//RENDERS
const displaySalary = () => {
    workText.innerText = "Pay: " + utils.formatNumber(salary)
}

//FUNCTIONS TO EXPORT
const work = {
    getSalary,
    depositSalary,
    checkLoan,
    repayLoan,
    displaySalary

}

export default work