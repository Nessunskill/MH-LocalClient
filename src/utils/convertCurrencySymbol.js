const convertCurrencySymbol = (currency) => {
    switch(currency) {
        case "RUB":
            return "₽";
        case "EUR":
            return "€";
        case "USD":
            return "$";
        case "GBP":
            return "£";
        case "MDL":
            return "MDL";
        case "TRY":
            return "TRY";
        case "UAH":
            return "₴";
        case "BYN":
            return "р.";
        case "KZT":
            return "₸";
        case "JPY":
            return "¥";
        default:
            return "MDL";
    }
}

export default convertCurrencySymbol;