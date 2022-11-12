import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TransactionsSectionsHeader = () => {
    const {transactions} = useSelector(state => state.transactions);
    const navigate = useNavigate();

    return(
        <div className="transactions__header" style={{width: "100%"}}>
            <div className="transactions__header-text">
                <span className="transactions__header-title">Последние записи</span>
                <span className="transactions__header-info">Всего {transactions.length} записей</span>
            </div>
            <button className="transactions__header-button button" onClick={() => navigate('transactions')}>Посмотреть все</button>
        </div>
    )
}

export default TransactionsSectionsHeader;