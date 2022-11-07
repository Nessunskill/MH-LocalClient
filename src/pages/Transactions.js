import { useSelector } from "react-redux";
import TransactionsSections from "../components/transactionsSection/TransactionsSections";
import "../styles/pagesStyles/transactions.scss";

const Transactions = () => {
    const {transactions} = useSelector(state => state.transactions);

    return(
        <>
            <div className="transactions-page-header">
                <h1>Ваши транзакции</h1>
                <h3>Всего {transactions.length} записей</h3>
            </div>
            <TransactionsSections/>
        </>
    )
}

export default Transactions;