//IMPORTS
import laptops from "./computers.js"
import bank from "./bank.js"
import work from "./work.js"
import utils from "./utils.js"


//Get HTML elements 
//buttons
const bankerButton = document.getElementById("banker-button")
const workButton = document.getElementById("work-button")
const storeButton = document.getElementById("store-button")
const repayButton = document.getElementById("repay-button")
const buyButton = document.getElementById("buy-button")
const laptopSelection = document.getElementById("laptop-select")


//Initial render
bank.displayBalance()
work.displaySalary()
repayButton.remove()
laptops.laptopRender()


//Event Handlers
laptopSelection.addEventListener("change", laptops.handleSelectionChange)
bankerButton.addEventListener("click", bank.getLoan)
workButton.addEventListener("click", work.getSalary)
storeButton.addEventListener("click", work.depositSalary)
repayButton.addEventListener("click", work.repayLoan)
buyButton.addEventListener("click", laptops.buyLaptop)
document.getElementById("dismiss-button-fail").addEventListener("click", utils.addHide)
document.getElementById("dismiss-button-success").addEventListener("click", utils.addHide)
