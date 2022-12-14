import { useDispatch, useSelector } from "react-redux";
import $axios from "../../axios/axios";
import { updateExpenseAmount } from "../../redux/slices/expensesSlice";
import { updateIncomeAmount } from "../../redux/slices/incomeSlice";
import { removeTransaction } from "../../redux/slices/transactionsSlice";
import { updateWalletAmount } from "../../redux/slices/walletsSlice";
import "./alertModal.scss";

const AlertModal = ({foundTransactions, closeModal, closeAlert, categoryId, type, deleteCategory}) => {
    const dispatch = useDispatch();
    const {income} = useSelector(state => state.income);
    const {wallets} = useSelector(state => state.wallets);
    const {expenses} = useSelector(state => state.expenses);

    const onFullRemove = () => {
        $axios.post(`category/removefull/${categoryId}`, {categoryType: type})
            .then(deleteCategory(type));

        foundTransactions.forEach(item => {
            if (item.transactionType === "income") {
                const from = income.find(element => element.id === item.fromId);
                const to = wallets.find(element => element.id === item.toId);
    
                dispatch(updateIncomeAmount({
                    id: from.id,
                    oldTransactionAmount: item.amount,
                    newTransactionAmount: 0,
                }));
    
                dispatch(updateWalletAmount({
                    id: to.id,
                    oldTransactionAmount: -item.amount,
                    newTransactionAmount: 0,
                }));
            }

            if (item.transactionType === "transfer") {
                const from = wallets.find(element => element.id === item.fromId);
                const to = wallets.find(element => element.id === item.toId);
    
                dispatch(updateWalletAmount({
                    id: from.id,
                    oldTransactionAmount: item.amount,
                    newTransactionAmount: 0,
                }));
                dispatch(updateWalletAmount({
                    id: to.id,
                    oldTransactionAmount: -item.amount,
                    newTransactionAmount: 0,
                }));
            }

            if (item.transactionType === "expense") {
                const from = wallets.find(element => element.id === item.fromId);
                const to = expenses.find(element => element.id === item.toId);
                
                dispatch(updateWalletAmount({
                    id: from.id,
                    oldTransactionAmount: item.amount,
                    newTransactionAmount: 0,
                }));
                dispatch(updateExpenseAmount({
                    id: to.id,
                    oldTransactionAmount: item.amount,
                    newTransactionAmount: 0,
                }));
            }

            dispatch(removeTransaction(item.id));
        });
    }

    const onRemove = () => {
        $axios.post(`category/remove/${categoryId}`, {categoryType: type})
            .then(deleteCategory(type));
    }

    return(
        <div className="alert-modal alert">
            <div className="alert__content">
                <div className="alert__close">
                    <img alt="close" src={`${process.env.PUBLIC_URL}/images/menu/close_dark.png`} onClick={closeAlert}/>
                </div>
                <div className="alert__info">
                    <p className="alert__info__warning">????????????????</p>
                    <p className="alert__info__message">???????????????? {foundTransactions.length} ???????????????????? ?????????????????? ?? ???????? ????????????????????</p>
                    <p className="alert__info__question">?????? ?? ???????? ???????????????</p>
                </div>

                <div className="alert__buttons">
                    <button onClick={() => {onRemove(); closeModal()}} className="alert__button alert__button_archive">???????????????? ?? ????????????</button>
                    <button onClick={() => {onFullRemove(); closeModal()}} className="alert__button alert__button_remove">??????????????</button>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;