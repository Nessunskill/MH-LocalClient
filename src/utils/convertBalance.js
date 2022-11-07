const convertBalance = (balance, currency) => {
    switch(currency) {
        case "RUB":
            return balance / 0.33;
        case "EUR":
            return balance / 19.0778;
        case "USD":
            return balance / 19.2733;
        case "GBP":
            return balance / 22.1739;
        case "MDL":
            return balance / 1;
        case "TRY":
            return balance / 1.0350;
        case "UAH":
            return balance / 0.5221;
        case "BYN":
            return balance / 7.7891;
        case "KZT":
            return balance / 0.0413;
        case "JPY":
            return balance / 0.1301;
        default:
            return balance / 1;
    }
}

export default convertBalance;