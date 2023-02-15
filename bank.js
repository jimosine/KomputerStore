import utils from "./utils.js"

let balance = 100
let currentLoan = 0
let loanAmount = 0

const balanceText = document.getElementById("balance-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
const workButtonsDiv = document.getElementById("work-buttons")
const repayButton = document.getElementById("repay-button")

const setBalance = (newBalance) => {
    balance = newBalance
}

const setLoan = (newLoan) => {
    currentLoan = newLoan
}

const displayBalance = () => {
    balanceText.innerText = "Balance: " + utils.formatNumber(balance)
}

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



function validLoan() {
    if (currentLoan > 0) {
        console.log("you already have a loan")
        return false
    }
    else if (Math.sign(loanAmount) !== 1 | isNaN(loanAmount)) {
        loanText.innerText = "Please input a valid positive number"
        return false
    } else if (loanAmount > balance * 2) {
        loanText.innerText = "You can't withdraw this much"
        console.log("too much")
        console.log(loanAmount);
        return false
    } else {
        return true
    }
}

const bank = {
    displayBalance,
    setBalance,
    setLoan,
    getLoan,
    validLoan
}

export default bank