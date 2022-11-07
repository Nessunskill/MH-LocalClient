

const convertToPrimaryCurrency = (amount, currency) => {
    let exchangeRate = 1;

    switch(currency) {
        case "RUB":
            exchangeRate = 0.33;
            break;
        case "EUR":
            exchangeRate = 19.0778;
            break;
        case "USD":
            exchangeRate = 19.2733;
            break;
        case "GBP":
            exchangeRate = 22.1739;
            break;
        case "MDL":
            exchangeRate = 1;
            break;
        case "TRY":
            exchangeRate = 1.0350;
            break;
        case "UAH":
            exchangeRate = 0.5221;
            break;
        case "BYN":
            exchangeRate = 7.7891;
            break;
        case "KZT":
            exchangeRate = 0.0413;
            break;
        case "JPY":
            exchangeRate = 0.1301;
            break;
        default:
            exchangeRate = 1;
            break;
    }

    return amount * exchangeRate;
}

export default convertToPrimaryCurrency;