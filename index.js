//TO DO:
//displayText function schrijven die je aanroept bij het einde van elke functie
//GOED CHECKEN OF JE SALARIS STORTEN/LENING AFLOSSEN GOED GAAT
//BANKER: NUMBER FORMAT + CHECK FOR VALUE TYPE

//Get elements and set variables
const balanceText = document.getElementById("balance-text")
const workText = document.getElementById("work-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
const workButton = document.getElementById("work-button")
const storeButton = document.getElementById("store-button")
const repayButton = document.getElementById("repay-button")
const workButtonsDiv = document.getElementById("work-buttons")
let balance = 100
let salary = 0
let currentLoan = 0
let loanFlag = false

//Change the text for banker accordingly
balanceText.innerText = "Balance: " + balance + " Kr"
loanText.innerText = " "

//Change the text for Work accordingly
workText.innerText = "Pay: " + salary + " Kr"

//Remove repay button untill we have a loan
repayButton.remove()

//Functions
function getLoan() {
    loanAmount = window.prompt("how much?")
    if (validLoan() == true) {
        loanFlag = true
        currentLoan = +currentLoan + +loanAmount
        balance = +balance + +loanAmount//using unary operator + to convert to number
        balanceText.innerText = "Balance: " + balance + " Kr"
        loanText.innerText = "Currently have " + currentLoan + " Kr outstanding."
        bankerButton.remove()
        workButtonsDiv.appendChild(repayButton)
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

function getSalary() {
    salary = +salary + 100
    workText.innerText = "Pay: " + salary + " Kr"
}

function depositSalary() {
    if (currentLoan > 0) {
        balance = +balance + (0.9 * +salary)
        currentLoan = +currentLoan - (0.1 * +salary)

    } else {
        balance = +balance + +salary
    }

    salary = 0

    workText.innerText = "Pay: " + salary + " Kr"
    balanceText.innerText = "Balance: " + balance + " Kr"
    loanText.innerText = "Currently have " + currentLoan + " Kr outstanding."
    checkLoan()
}

function checkLoan() {
    if (currentLoan <= 0) {
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
    currentLoan = +currentLoan - +salary

    salary = 0
    workText.innerText = "Pay: " + salary + " Kr"
    balanceText.innerText = "Balance: " + balance + " Kr"
    loanText.innerText = "Currently have " + currentLoan + " Kr outstanding."
    checkLoan()
}

//Event Handlers
bankerButton.addEventListener("click", getLoan)
workButton.addEventListener("click", getSalary)
storeButton.addEventListener("click", depositSalary)
repayButton.addEventListener("click", repayLoan)