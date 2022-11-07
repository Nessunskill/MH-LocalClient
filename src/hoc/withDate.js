import formatDate from "../utils/formatDate";

const withDate = (WrappedComponent) => {
    return (props) => {
        let today = new Date();
        today.setDate(today.getUTCDate() + 2);
        today = today.toLocaleDateString();
        today = today.replace(/\./g, "-")
        today = formatDate(today);

        return <WrappedComponent today={today} {...props}/>
    }
}

export default withDate;