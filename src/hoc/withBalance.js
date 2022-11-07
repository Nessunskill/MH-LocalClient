import { useEffect, useState } from "react"


const withBalance = (WrappedComponent) => {
    return (props) => {
        const {data} = props;
        const [balance, setBalance] = useState("");

        useEffect(() => {
            setBalance(() => {
                return data.reduce((total, item) => total + item.amount, 0)
            });
        }, [data]);

        return <WrappedComponent balance={balance} {...props}/>
    }
}

export default withBalance;