import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeIncome, updateIncomeInfo } from "../../redux/slices/incomeSlice";
import { removeWallet, updateWalletInfo } from "../../redux/slices/walletsSlice";
import { removeExpense, updateExpenseInfo } from "../../redux/slices/expensesSlice";
import AlertModal from "../alertModal/AlertModal";
import "./transactionForm.scss";
import { useAuthorizedRequest } from "../../hooks/useAuthorizedRequest.hook";

const EditForm = ({closeModal, id, currentTitle, currentCurrency, currentIcon, type}) => {
    const {request} = useAuthorizedRequest();
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

        request(`category/changefields/${id}`, "POST", JSON.stringify(data))
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
            request(`category/remove/${id}`, "POST", JSON.stringify({categoryType: type}))
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
                    <label className="transaction-form__label" htmlFor="amount">Название:</label>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className="transaction-form__input" type="text" name="amount" placeholder="Название категории..."/>
                </div>
                <div className="transaction-form__inputs-container">
                    <label className="transaction-form__label" htmlFor="amount">Валюта:</label>
                    <select onChange={(e) => setCurrency(e.target.value)} defaultValue={currency} name="currency" id="" className="transaction-form__input">
                        <option value="USD">Доллар США</option>
                        <option value="EUR">Евро</option>
                        <option value="RUB">Российский рубль</option>
                        <option value="UAH">Украинская гривна</option>
                        <option value="KZT">Казахстанский тенге</option>
                        <option value="MDL">Молдавский леи</option>
                        <option value="JPY">Японская иена</option>
                        <option value="BYN">Белорусский рубль</option>
                        <option value="TRY">Турецкая лира</option>
                        <option value="GBP">Фунт стерлингов</option>
                    </select>
                </div>
            </form>

            <div className="transaction-form__footer edit-footer">
                <button onClick={onRemove} className="transaction-form__button transaction-form__button_remove">Удалить категорию</button>
                <button onClick={onSubmit} className="transaction-form__button">Сохранить</button>
            </div>
            {
                showAlert ? <AlertModal foundTransactions={foundTransactions} categoryId={id} closeModal={closeModal} closeAlert={closeAlert} type={type} deleteCategory={deleteCategory}/> : null
            }
        </div>
    )
}

export default EditForm;
