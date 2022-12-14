import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeIncome, updateIncomeInfo } from "../../redux/slices/incomeSlice";
import { removeWallet, updateWalletInfo } from "../../redux/slices/walletsSlice";
import { removeExpense, updateExpenseInfo } from "../../redux/slices/expensesSlice";
import AlertModal from "../alertModal/AlertModal";
import "./transactionForm.scss";
import $axios from "../../axios/axios";

const EditForm = ({closeModal, id, currentTitle, currentCurrency, currentIcon, type}) => {
    const {icons} = useSelector(state => state.icons);
    const [title, setTitle] = useState(currentTitle);
    const [activeIcon, setActiveIcon] = useState(currentIcon);
    const [currency, setCurrency] = useState(currentCurrency);
    const [showAlert, setShowAlert] = useState(false);
    const {transactions} = useSelector(state => state.transactions);
    const [foundTransactions, setFoundTransactions] = useState();
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            newTitle: title,
            newIcon: activeIcon,
            newCurrency: currency,
            categoryType: type
        }

        $axios.post(`category/changefields/${id}`, data)
            .then(() => {
                if (type === "income") {
                    dispatch(updateIncomeInfo({id, title, icon: activeIcon, currency}));
                }
                if (type === "wallets") {
                    dispatch(updateWalletInfo({id, title, icon: activeIcon, currency}));
                }
                if (type === "expenses") {
                    dispatch(updateExpenseInfo({id, title, icon: activeIcon, currency}));
                }
            });
        closeModal();
    }

    const onRemove = () => {
        const foundTransactions = findTransactions(id);
        
        if (foundTransactions.length > 0) {
            setFoundTransactions(foundTransactions)
            setShowAlert(true);
        } else {
            $axios.post(`category/remove/${id}`, {categoryType: type})
                .then(deleteCategory(type));

            closeModal();
        }
    }

    const deleteCategory = (type) => {
        if (type === "income") {
            dispatch(removeIncome({id: id}));
        }
        if (type === "wallets") {
            dispatch(removeWallet({id: id}));
        }
        if (type === "expenses") {
            dispatch(removeExpense({id: id}));
        }
    }

    const closeAlert = () => {
        setShowAlert(false);
    }

    const findTransactions = (id) => {
        return [...transactions.filter(item => item.fromId === id), ...transactions.filter(item => item.toId === id)];
    }

    return(
        <div className="transaction-form__container">
            <form className="transaction-form" onSubmit={onSubmit}>
                    <ul className="transaction-form__icons-list">
                    {
                        icons.map(icon => {
                            return(
                                <li onClick={() => setActiveIcon(icon.icon)} key={icon._id} className="transaction-form__icons-item">
                                    <img 
                                        className={icon.icon === activeIcon ? "transaction-form__icon transaction-form__icon_active" : "transaction-form__icon"}
                                        src={icon.icon} 
                                        alt="icon"/>
                                </li>
                            )
                        })
                    }
                    </ul>
                <div className="transaction-form__inputs-container">
                    <label className="transaction-form__label" htmlFor="amount">????????????????:</label>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className="transaction-form__input" type="text" name="amount" placeholder="???????????????? ??????????????????..."/>
                </div>
                <div className="transaction-form__inputs-container">
                    <label className="transaction-form__label" htmlFor="amount">????????????:</label>
                    <select onChange={(e) => setCurrency(e.target.value)} defaultValue={currency} name="currency" id="" className="transaction-form__input">
                        <option value="USD">???????????? ??????</option>
                        <option value="EUR">????????</option>
                        <option value="RUB">???????????????????? ??????????</option>
                        <option value="UAH">???????????????????? ????????????</option>
                        <option value="KZT">?????????????????????????? ??????????</option>
                        <option value="MDL">???????????????????? ??????</option>
                        <option value="JPY">???????????????? ????????</option>
                        <option value="BYN">?????????????????????? ??????????</option>
                        <option value="TRY">???????????????? ????????</option>
                        <option value="GBP">???????? ????????????????????</option>
                    </select>
                </div>
            </form>

            <div className="transaction-form__footer edit-footer">
                <button onClick={onRemove} className="transaction-form__button transaction-form__button_remove">?????????????? ??????????????????</button>
                <button onClick={onSubmit} className="transaction-form__button">??????????????????</button>
            </div>
            {
                showAlert ? <AlertModal foundTransactions={foundTransactions} categoryId={id} closeModal={closeModal} closeAlert={closeAlert} type={type} deleteCategory={deleteCategory}/> : null
            }
        </div>
    )
}

export default EditForm;
