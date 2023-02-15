//TO DO:

//render function schrijven die je aanroept bij het einde van elke functie
//GOED CHECKEN OF JE SALARIS STORTEN/LENING AFLOSSEN GOED GAAT

//Get elements and set variables
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

let price = 0
let balance = 100
let salary = 0
let currentLoan = 0

//laptop selection dingen
const laptopSelection = document.getElementById("laptop-select")
const laptopSpecs = document.getElementById("specs-list")
let laptops = []

//api dingen
const API_URL = "https://hickory-quilled-actress.glitch.me/computers/"
const laptopNameText = document.getElementById("laptop-name")
const laptopDescription = document.getElementById("laptop-description")
const imageElement = document.getElementById("laptop-img")

//Change the text for banker accordingly
balanceText.innerText = "Balance: " + formatNumber(balance)
loanText.innerText = " "

//Change the text for Work accordingly
workText.innerText = "Pay: " + formatNumber(salary)

//Remove repay button untill we have a loan
repayButton.remove()

//IN UTIL STOPPEN
function formatNumber(number) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)
}

//Functions
function getLoan() {
    loanAmount = window.prompt("How much?")

    if (validLoan() == true) {
        currentLoan = +currentLoan + +loanAmount
        balance = +balance + +loanAmount//using unary operator + to convert to number
        balanceText.innerText = "Balance: " + formatNumber(balance)
        loanText.innerText = "Currently have " + formatNumber(currentLoan) + " outstanding."
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

function getSalary() {
    salary = +salary + 100
    workText.innerText = "Pay: " + formatNumber(salary)
}

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
    workText.innerText = "Pay: " + formatNumber(salary)
    balanceText.innerText = "Balance: " + formatNumber(balance)
    loanText.innerText = "Currently have " + formatNumber(currentLoan) + " outstanding."
    //render for the loan button
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


    //get what you store as balance
    const extraMoney = +salary - +currentLoan

    if (extraMoney > 1) {
        currentLoan = 0
        balance += extraMoney
    }
    else {
        currentLoan = +currentLoan - +salary
    }
    salary = 0
    workText.innerText = "Pay: " + formatNumber(salary)
    balanceText.innerText = "Balance: " + formatNumber(balance)
    loanText.innerText = "Currently have " + formatNumber(currentLoan) + " outstanding."
    checkLoan()
}

//API DING


//CONSOLE LOGS WEG DOEN
fetch(API_URL)
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(json => {
        console.log(json)
        return json
    })
    .then(data => {
        laptops = data
        price = laptops[0].price
        addLaptopsToMenu(laptops)
        //get selected id
        const selectedId = laptopSelection.value - 1
        console.log(selectedId);
        addSpecs(laptops[selectedId])
        renderLaptop(data[selectedId])


        console.log(data[selectedId])
    })


//SPECS DING
const addSpecs = (laptop) => {
    laptop.specs.forEach(x => {
        const laptopSpecsElement = document.createElement("li")
        laptopSpecsElement.appendChild(document.createTextNode(x))
        laptopSpecs.appendChild(laptopSpecsElement)
    })
}

//
const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
}

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopSelection.appendChild(laptopElement)

}

function renderLaptop(userData) {

    laptopNameText.innerText = userData.title
    const newUrl = API_URL.replace("computers/", "") + userData.image
    console.log(newUrl)
    imageElement.src = newUrl
    price = userData.price
    priceText.innerText = formatNumber(userData.price)
}

//HANDLE CHANGES IN SELECT
const handleSelectionChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    priceText.innerText = formatNumber(selectedLaptop.price)
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

function buyLaptop() {
    if (balance >= price) {
        balance -= price
        balanceText.innerText = "Balance: " + formatNumber(balance)
        document.getElementById('alert-success').classList.remove('hide')
        document.getElementById("dismiss-button2").classList.remove('hide')
        buyButton.classList.add('hide')
    }
    else {
        document.getElementById('alertId').classList.remove('hide')
        document.getElementById("dismiss-button").classList.remove('hide')
        buyButton.classList.add('hide')
    }
}

function addHide() {
    console.log("test");
    buyButton.classList.remove('hide')
    document.getElementById('alert-success').classList.add('hide')
    document.getElementById('alertId').classList.add('hide')

}

//Event Handlers
laptopSelection.addEventListener("change", handleSelectionChange)
bankerButton.addEventListener("click", getLoan)
workButton.addEventListener("click", getSalary)
storeButton.addEventListener("click", depositSalary)
repayButton.addEventListener("click", repayLoan)
buyButton.addEventListener("click", buyLaptop)

document.getElementById("dismiss-button").addEventListener("click", addHide)
document.getElementById("dismiss-button2").addEventListener("click", addHide)
