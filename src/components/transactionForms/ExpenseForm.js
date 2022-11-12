import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import withDate from "../../hoc/withDate";
import { createTransaction } from "../../redux/slices/transactionsSlice";
import "./transactionForm.scss";
import convertCurrencySymbol from "../../utils/convertCurrencySymbol";
import convertBalance from "../../utils/convertBalance";
import convertToPrimaryCurrency from "../../utils/convertToPrimaryCurrency";
import { updateWalletBalance } from "../../redux/slices/walletsSlice";
import { updateExpenseBalance } from "../../redux/slices/expensesSlice";
import $axios from "../../axios/axios";

const ExpenseForm = ({title, closeModal, from, to, year, month, day}) => {
    const today = `${year}-${month}-${day}`;
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(today);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: nanoid(),
            amount: convertToPrimaryCurrency(amount, from.currency),
            description: " ",
            date: date,
            fromId: from.id,
            toId: to.id,
            transactionType: "expense",
        }


        $axios.post("transactions", data)
            .then(res => {
                console.log(res.data)
                dispatch(createTransaction(res.data));
                dispatch(updateWalletBalance({
                    id: from.id,
                    amount: -data.amount,
                }));
                dispatch(updateExpenseBalance({
                    id: to.id,
                    amount: data.amount,
                }));
                closeModal();
            });
    }

    return(
        <div className="transaction-form__container">
            <form className="transaction-form" onSubmit={onSubmit}>
                <div className="transaction-form__items-container items">
                    <div className="transaction-form__item item">
                        <span className="item__type">Кошелёк</span>
                        <span className="item__title">{from.title}</span>
                        <img className="item__icon" src={from.thumbnail} alt={from.title}/>
                        <span className="item__amount">{convertBalance(from.amount, from.currency).toFixed(2)} {convertCurrencySymbol(from.currency)}</span>
                    </div>

                    <div className="transaction-form__item item__direction">
                        <span className="item__direction__amount">{amount}{amount > 0 ? from.currency : null}</span>
                        <img src="https://imageup.ru/img69/4045855/right-1.png" alt="arrow"/>
                    </div>

                    <div className="transaction-form__item item">
                        <span className="item__type">Категория</span>
                        <span className="item__title">{to.title}</span>
                        <img className="item__icon" src={to.thumbnail} alt={to.title}/>
                        <span className="item__amount">{convertBalance(to.amount, to.currency).toFixed(2)} {convertCurrencySymbol(to.currency)}</span>
                    </div>                
                </div>

                <div className="transaction-form__inputs-container">
                    <label className="transaction-form__label" htmlFor="amount">Сколько?</label>
                    <input onChange={(e) => setAmount(e.target.value)} value={amount} className="transaction-form__input" type="text" name="amount" placeholder="Сумма"/>
                </div>

                <div className="transaction-form__inputs-container">
                    <label className="transaction-form__label" htmlFor="date">Когда?</label>
                    <input onChange={(e) => setDate(e.target.value)} value={date} className="transaction-form__input" type="date" name="date"/>
                </div>
            </form>

            <div className="transaction-form__footer">
                <button onClick={onSubmit} className="transaction-form__button">Сохранить</button>
            </div>
        </div>
    )
}

export default withDate(ExpenseForm);
