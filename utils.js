const url = "https://hickory-quilled-actress.glitch.me/computers/"
let laptops = []

//FORMATS A NUMERIC VALUE TO EURO FORMAT
function formatNumber(number) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(number)
}

function getLaptops() {
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(json => {
            return json
        })
        .then(data => {
            laptops = data
            console.log(data);
            return data
        })

}



const utils = {
    formatNumber,
    getLaptops
}

export default utils