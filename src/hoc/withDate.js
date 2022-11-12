const withDate = (WrappedComponent) => {
    return (props) => {
        let day, month, year;

        const newDate = new Date();

        day = newDate.getDate();
        month = newDate.getMonth() + 1;
        year = newDate.getFullYear();

        const today = `${year}-${month}-${day}`;

        return <WrappedComponent today={today} {...props}/>
    }
}

export default withDate;