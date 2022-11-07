import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIcons } from "../redux/slices/iconsSlice";

import CategoriesSections from "../components/categoriesSection/CategoriesSections";
import TransactionsSections from "../components/transactionsSection/TransactionsSections";

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIcons());
        // eslint-disable-next-line
    }, []);

    return(
        <>
            <CategoriesSections/>
            <TransactionsSections/>
        </>
    )
}

export default Dashboard;