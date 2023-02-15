//HTML ELEMENTS
const buyButton = document.getElementById("buy-button")

//FORMATS A NUMERIC VALUE TO EURO FORMAT
function formatNumber(number) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(number)
}

//Function that hides the alerts when they are dismissed and renders the buyButton back in
function addHide() {
    buyButton.classList.remove('hide')
    document.getElementById('alert-success').classList.add('hide')
    document.getElementById('alert-fail').classList.add('hide')

}

//FUNCTIONS TO EXPORT
const utils = {
    formatNumber,
    addHide
}

export default utils