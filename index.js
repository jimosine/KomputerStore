//IMPORTS
import utils from "./utils.js"

//Get HTML elements 
const balanceText = document.getElementById("balance-text")
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
let balance = 100
let salary = 0
let currentLoan = 0
let laptops = []
let loanAmount = 0

//Change the text for banker accordingly
balanceText.innerText = "Balance: " + utils.formatNumber(balance)
loanText.innerText = " "

//Change the text for Work accordingly
workText.innerText = "Pay: " + utils.formatNumber(salary)

//Remove repay button untill we have a loan
repayButton.remove()


//Function to get a loan. Asks users to put in any value (which is later checked for validity)
//If the loan is valid, increase the loan with the specified value, as well as the current bank balance.
//Renders the page accordingly
function getLoan() {
    loanAmount = window.prompt("How much?")

    if (validLoan() == true) {
        currentLoan = +currentLoan + +loanAmount //using unary operator + to convert to number
        balance = +balance + +loanAmount
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
        console.log("you already have a loan")
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
    if (currentLoan > 0) {
        //check if we are over depositing
        if (+currentLoan - (0.1 * +salary) < 0) {
            console.log((+currentLoan - (0.1 * +salary)))
            balance = +balance + +salary - +currentLoan
            currentLoan = 0
            //otherwise normal depoist
        } else {
            balance = +balance + (0.9 * +salary)
            currentLoan = +currentLoan - (0.1 * +salary)
        }
        //if no loan, just deposit
    } else {
        balance = +balance + +salary
    }
    //salary = 0 again after depositing
    salary = 0

    //render page
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    balanceText.innerText = "Balance: " + utils.formatNumber(balance)
    loanText.innerText = "Currently have " + utils.formatNumber(currentLoan) + " outstanding."
    //render for the loan button & repay button
    checkLoan()
}

//Function that checks if a loan is payed off and renders the page accordingly
function checkLoan() {
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
    //get what you store as balance
    if (+salary - +currentLoan > 0) {
        balance += +salary - +currentLoan
        currentLoan = 0
    }
    else {
        currentLoan = +currentLoan - +salary
    }
    salary = 0
    workText.innerText = "Pay: " + utils.formatNumber(salary)
    balanceText.innerText = "Balance: " + utils.formatNumber(balance)
    loanText.innerText = "Currently have " + utils.formatNumber(currentLoan) + " outstanding."
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
    if (balance >= price) {
        balance -= price
        balanceText.innerText = "Balance: " + utils.formatNumber(balance)
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
bankerButton.addEventListener("click", getLoan)
workButton.addEventListener("click", getSalary)
storeButton.addEventListener("click", depositSalary)
repayButton.addEventListener("click", repayLoan)
buyButton.addEventListener("click", buyLaptop)
document.getElementById("dismiss-button-fail").addEventListener("click", addHide)
document.getElementById("dismiss-button-success").addEventListener("click", addHide)
