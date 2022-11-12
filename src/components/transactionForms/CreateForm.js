import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $axios from "../../axios/axios";
import { createExpense } from "../../redux/slices/expensesSlice";
import { createIncome } from "../../redux/slices/incomeSlice";
import { createWallet } from "../../redux/slices/walletsSlice";
import "./transactionForm.scss";

const CreateForm = ({closeModal, type}) => {
    const {icons} = useSelector(state => state.icons);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [activeIcon, setActiveIcon] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        let apiEndPoint = null;
        if (type === "income") apiEndPoint = "income";
        if (type === "wallets") apiEndPoint = "wallets";
        if (type === "expenses") apiEndPoint = "categories";

        const data = {
            id: nanoid(),
            title,
            thumbnail: activeIcon,
            currency: currency,
        }

        $axios.post(apiEndPoint, data)
            .then(res => {
                if (apiEndPoint === "income") dispatch(createIncome(res.data));
                if (apiEndPoint === "wallets") dispatch(createWallet(res.data));
                if (apiEndPoint === "categories") dispatch(createExpense(res.data));
            });  
        closeModal();
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
                        <option value="MDL">Молдавский лей</option>
                        <option value="JPY">Японская иена</option>
                        <option value="BYN">Белорусский рубль</option>
                        <option value="TRY">Турецкая лира</option>
                        <option value="GBP">Фунт стерлингов</option>
                    </select>
                </div>
            </form>

            <div className="transaction-form__footer">
                <button onClick={onSubmit} className="transaction-form__button">Сохранить</button>
            </div>
        </div>
    )
}

export default CreateForm;
