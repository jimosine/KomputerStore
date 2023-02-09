//TO DO:
//BANKER: NUMBER FORMAT + CHECK FOR VALUE TYPE

//Get elements and set variables
const balanceText = document.getElementById("balance-text")
const workText = document.getElementById("work-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
let balance = 100
let salary = 0
let currentLoan = 0
let loanFlag = false

//Change the text for banker accordingly
balanceText.innerText = "Balance: " + balance + " Kr"
loanText.innerText = " "

//Change the text for Work accordingly
balanceText.innerText = "Pay: " + salary + " Kr"

//Functions
function getLoan() {
    loanAmount = window.prompt("how much?")
    if (validLoan() == true) {
        loanFlag = true


        balance = +balance + +loanAmount//using unary operator + to convert to number
        balanceText.innerText = "Balance: " + balance + " Kr"
        loanText.innerText = "Currently have " + loanAmount + " Kr outstanding."
        bankerButton.remove()
    }
}

function validLoan() {
    if (currentLoan > 0) {
        console.log("you already have a loan")
        return false
    } else if (loanAmount > balance * 2) {
        loanText.innerText = "You can't withdraw this much"
        console.log("too much")
        return false
    } else {
        return true
    }
}

//Event Handlers
bankerButton.addEventListener("click", getLoan)