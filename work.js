import utils from "./utils.js"
import bank from "./bank.js"

const workText = document.getElementById("work-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
const workButton = document.getElementById("work-button")
const storeButton = document.getElementById("store-button")
const repayButton = document.getElementById("repay-button")

let salary = 0

function displaySalary() {
    workText.innerText = "Pay: " + utils.formatNumber(salary)
}

function getSalary() {
    salary = +salary + 100
    displaySalary()
}

function depositSalary() {
    if (bank.currentLoan > 0) {
        //check if we are over depositing
        if (+bank.currentLoan - (0.1 * +salary) < 0) {
            console.log((+bank.currentLoan - (0.1 * +salary)))
            bank.balance = +bank.balance + +salary - +bank.currentLoan
            bank.currentLoan = 0
            //otherwise normal depoist
        } else {
            bank.balance = +bank.balance + (0.9 * +salary)
            bank.currentLoan = +bank.currentLoan - (0.1 * +salary)
        }
        //if no loan, just deposit
    } else {
        console.log(bank.balance)
        bank.setBalance(bank.balance + salary)
    }
    salary = 0

    //render page
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    bank.displayBalance()
    loanText.innerText = "Currently have " + utils.formatNumber(bank.currentLoan) + " outstanding."
    //render for the loan button
    checkLoan()
}

function checkLoan() {
    if (bank.currentLoan <= 0) {
        console.log("adding back")
        loanText.innerText = " "
        console.log(loanText.innerText)
        var test = document.getElementById("test")

        // appending button to div
        test.appendChild(bankerButton)
        //removing repay button
        repayButton.remove()
    }
}

function repayLoan() {


    //get what you store as balance
    const extraMoney = +salary - +bank.currentLoan

    if (extraMoney > 1) {
        bank.currentLoan = 0
        bank.setBalance = bank.balance + extraMoney
    }
    else {
        bank.currentLoan = +bank.currentLoan - +salary
    }
    salary = 0
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    bank.displayBalance()
    loanText.innerText = "Currently have " + utils.formatNumber(bank.currentLoan) + " outstanding."
    checkLoan()
}

const work = {
    getSalary,
    depositSalary,
    checkLoan,
    repayLoan,
    displaySalary

}

export default work