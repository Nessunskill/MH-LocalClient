const withDate = (WrappedComponent) => {
    return (props) => {
        let day, month, year;

        const newDate = new Date();

        day = newDate.getDate();
        month = newDate.getMonth() + 1;
        year = newDate.getFullYear();

        return <WrappedComponent year={year} month={month} day={day} {...props}/>
    }
}

export default withDate;