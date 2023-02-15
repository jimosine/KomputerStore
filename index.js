//IMPORTS
import utils from "./utils.js"
import bank from "./bank.js"
import work from "./work.js"

//Get HTML elements 
//buttons
const bankerButton = document.getElementById("banker-button")
const workButton = document.getElementById("work-button")
const storeButton = document.getElementById("store-button")
const repayButton = document.getElementById("repay-button")
const buyButton = document.getElementById("buy-button")
//selector
const laptopSelection = document.getElementById("laptop-select")
const laptopSpecs = document.getElementById("specs-list")
//description
const priceText = document.getElementById("price-text")
const laptopNameText = document.getElementById("laptop-name")
const laptopDescription = document.getElementById("laptop-description")
const imageElement = document.getElementById("laptop-img")


//Set variables
const API_URL = "https://hickory-quilled-actress.glitch.me/computers/"
let price = 0
let laptops = []

//Change the text for banker accordingly
bank.displayBalance()
work.displaySalary()
//Remove repay button untill we have a loan
repayButton.remove()

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
workButton.addEventListener("click", work.getSalary)
storeButton.addEventListener("click", work.depositSalary)
repayButton.addEventListener("click", work.repayLoan)
buyButton.addEventListener("click", buyLaptop)
document.getElementById("dismiss-button-fail").addEventListener("click", addHide)
document.getElementById("dismiss-button-success").addEventListener("click", addHide)
