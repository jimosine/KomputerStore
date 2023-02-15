//FORMATS A NUMERIC VALUE TO EURO FORMAT
function formatNumber(number) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(number)
}

const utils = {
    formatNumber
}

export default utils