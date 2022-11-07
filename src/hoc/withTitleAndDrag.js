import { useEffect, useState } from "react"


const withTitleAndDrag = (WrappedComponent) => {
    return (props) => {
        const {data} = props;
        const [title, setTitle] = useState("");
        const [canDrag, setCanDrag] = useState(false);

        useEffect(() => {
            if (data?.length > 0) {
                switch(data[0].categoryName) {
                    case "incomeSources":
                        setTitle("Доходы");
                        setCanDrag(true);
                        break;
                    case "wallets":
                        setTitle("Кошельки");
                        setCanDrag(true);
                        break;
                    case "expenses":
                        setTitle("Расходы");
                        setCanDrag(false);
                        break; 
                    default:
                        setTitle(data[0].categoryName);
                        break;
                }
            }
            // eslint-disable-next-line
        }, [data]);

        return <WrappedComponent canDrag={canDrag} title={title} {...props}/>
    }
}

export default withTitleAndDrag;