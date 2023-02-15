//IMPORTS
import utils from "./utils.js"
import bank from "./bank.js"
// import work from "./work.js"

//Get HTML elements 
const priceText = document.getElementById("price-text")
const workText = document.getElementById("work-text")
const loanText = document.getElementById("loan-text")
const bankerButton = document.getElementById("banker-button")
const workButton = document.getElementById("work-button")
const storeButton = document.getElementById("store-button")
const repayButton = document.getElementById("repay-button")
const buyButton = document.getElementById("buy-button")
const workButtonsDiv = document.getElementById("work-buttons")
const laptopSelection = document.getElementById("laptop-select")
const laptopSpecs = document.getElementById("specs-list")
const API_URL = "https://hickory-quilled-actress.glitch.me/computers/"
const laptopNameText = document.getElementById("laptop-name")
const laptopDescription = document.getElementById("laptop-description")
const imageElement = document.getElementById("laptop-img")
const bankerDiv = document.getElementById("banker-div")

//Set variables
let price = 0
let salary = 0
let laptops = []

//Change the text for banker accordingly
bank.displayBalance()
loanText.innerText = " "

//Change the text for Work accordingly
workText.innerText = "Pay: " + utils.formatNumber(salary)

//Remove repay button untill we have a loan
repayButton.remove()


//Function to increase a user's salary by 100 and rerenders the salary 
//Runs when "work" button is clicked
function getSalary() {
    salary = +salary + 100
    workText.innerText = "Pay: " + utils.formatNumber(salary)
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
            //balance = +balance + +salary - +currentLoan
            bank.setLoan(0)
            //otherwise normal depoist
        } else {
            bank.setBalance(+balance + (0.9 * +salary))
            //balance = +balance + (0.9 * +salary)
            bank.setLoan(+currentLoan - (0.1 * +salary))
            //currentLoan = +currentLoan - (0.1 * +salary)
        }
        //if no loan, just deposit
    } else {
        bank.setBalance(+balance + +salary)
        //balance = +balance + +salary
    }
    //salary = 0 again after depositing
    salary = 0

    //render page
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    bank.displayBalance()
    loanText.innerText = "Currently have " + utils.formatNumber(bank.returnLoanAmount()) + " outstanding."
    //render for the loan button & repay button
    checkLoan()
}

//Function that checks if a loan is payed off and renders the page accordingly
function checkLoan() {
    let currentLoan = bank.returnLoanAmount()
    if (currentLoan <= 0) {
        loanText.innerText = " "
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
        //balance += +salary - +currentLoan
        bank.setLoan(0)
        //currentLoan = 0
    }
    else {
        //currentLoan = +currentLoan - +salary
        bank.setLoan(currentLoan - salary)
    }
    salary = 0
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    bank.displayBalance()
    loanText.innerText = "Currently have " + utils.formatNumber(bank.returnLoanAmount()) + " outstanding."
    checkLoan()
}

//FUNCTION THAT GETS THE COMPUTER DATA FROM THE API AND STORES IN DATA & LAPTOP
//Data is an array of laptop objects
//Then calls functions to render the page accordingly
fetch(API_URL)
    .then(response => {
        return response.json()
    })
    .then(json => {
        return json
    })
    .then(data => {
        laptops = data
        addLaptopsToMenu(laptops)
        const selectedId = laptopSelection.value - 1
        addSpecs(laptops[selectedId])
        renderLaptop(data[selectedId])
    })

//Function that gets a single laptop object as input and creates
//a new HTML option element to be added to the laptop select element
const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopSelection.appendChild(laptopElement)
}

//Executes the add single laptop function for all laptops that are passed as
//an array of laptops in the argument
const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
}

//Function that get a laptop object as argument and adds all the specs of said
//laptop as a HTML li element to the laptop specs UL list element
const addSpecs = (laptop) => {
    laptop.specs.forEach(x => {
        const laptopSpecsElement = document.createElement("li")
        laptopSpecsElement.appendChild(document.createTextNode(x))
        laptopSpecs.appendChild(laptopSpecsElement)
    })
}

//Function that renders all laptop specific information as obtained trough the API fetch
//Uses some string manipulation to obtain the correct address where the image is stored
//And updates the title/image/price in the laptop description element
function renderLaptop(userData) {
    laptopNameText.innerText = userData.title
    const newUrl = API_URL.replace("computers/", "") + userData.image
    imageElement.src = newUrl
    price = userData.price
    priceText.innerText = utils.formatNumber(userData.price)
}

//Function that handles the changes in the laptop selection element
//Updates the price/specs/image/name/description fields
const handleSelectionChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    priceText.innerText = utils.formatNumber(selectedLaptop.price)
    price = selectedLaptop.price

    //clear the ul first
    laptopSpecs.innerHTML = "";
    addSpecs(laptops[e.target.selectedIndex])

    //change image
    const newUrl = API_URL.replace("computers/", "") + selectedLaptop.image
    imageElement.src = newUrl

    //change name
    laptopNameText.innerText = selectedLaptop.title

    //change description
    laptopDescription.innerText = selectedLaptop.description

}

//Function that allows the user to buy the selected computer (if funds are sufficient)
//If there are not enough funds, an alert pops up informing the user of this
//If there are enough funds, subtract the price from the balance and rerender
function buyLaptop() {
    let balance = bank.getBalance()
    if (balance >= price) {
        bank.setBalance(balance - price)
        bank.displayBalance()
        document.getElementById('alert-success').classList.remove('hide')
        buyButton.classList.add('hide')
    }
    else {
        document.getElementById('alert-fail').classList.remove('hide')
        buyButton.classList.add('hide')
    }
}

//Function that hides the alerts when they are dismissed and renders the buyButton back in
function addHide() {
    buyButton.classList.remove('hide')
    document.getElementById('alert-success').classList.add('hide')
    document.getElementById('alert-fail').classList.add('hide')

}

//Event Handlers
laptopSelection.addEventListener("change", handleSelectionChange)
bankerButton.addEventListener("click", bank.getLoan)
workButton.addEventListener("click", getSalary)
storeButton.addEventListener("click", depositSalary)
repayButton.addEventListener("click", repayLoan)
buyButton.addEventListener("click", buyLaptop)
document.getElementById("dismiss-button-fail").addEventListener("click", addHide)
document.getElementById("dismiss-button-success").addEventListener("click", addHide)
