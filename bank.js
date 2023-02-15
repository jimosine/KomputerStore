//IMPORTS
import utils from "./utils.js"

//VARIABLES
let balance = 100
let currentLoan = 0
let loanAmount = 0

//HTML ELEMENTS
const balanceText = document.getElementById("balance-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
const workButtonsDiv = document.getElementById("work-buttons")
const repayButton = document.getElementById("repay-button")


//Function to get a loan. Asks users to put in any value (which is later checked for validity)
//If the loan is valid, increase the loan with the specified value, as well as the current bank balance.
//Renders the page accordingly
function getLoan() {
    loanAmount = window.prompt("How much?")

    if (validLoan() == true) {
        currentLoan = +currentLoan + +loanAmount
        balance = +balance + +loanAmount//using unary operator + to convert to number
        balanceText.innerText = "Balance: " + utils.formatNumber(balance)
        loanText.innerText = "Currently have " + utils.formatNumber(currentLoan) + " outstanding."
        bankerButton.remove()
        workButtonsDiv.appendChild(repayButton)
    }
}


//Function to check if the user input equals a valid loan amount
//A user can not take out a loan if one is outstanding
//A loan has to be a positive number
//A loan can not be twice as large as the user's current bank balance
function validLoan() {
    if (currentLoan > 0) {
        return false
    }
    else if (Math.sign(loanAmount) !== 1 | isNaN(loanAmount)) {
        loanText.innerText = "Please input a valid positive number"
        return false
    } else if (loanAmount > balance * 2) {
        loanText.innerText = "You can't withdraw this much"

        return false
    } else {
        return true
    }
}

//GETTERS AND SETTERS
const setBalance = (newBalance) => {
    balance = newBalance
}

const setLoan = (newLoan) => {
    currentLoan = newLoan
}

const returnLoanAmount = () => { return currentLoan }

const getBalance = () => { return balance }

//RENDERS
const displayBalance = () => {
    balanceText.innerText = "Balance: " + utils.formatNumber(balance)
}

//FUNCTIONS TO EXPORT
const bank = {
    displayBalance,
    setBalance,
    setLoan,
    getLoan,
    validLoan,
    returnLoanAmount,
    getBalance
}

export default bank