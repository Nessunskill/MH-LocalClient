import { useEffect, useRef, useState } from "react";
import "./transactionItem.scss";

import { useDispatch, useSelector } from "react-redux";
import { changeTransactionAmount, changeTransactionDate, removeTransaction } from "../../redux/slices/transactionsSlice";
import { updateExpenseAmount } from "../../redux/slices/expensesSlice";
import { updateWalletAmount } from "../../redux/slices/walletsSlice";
import { updateIncomeAmount } from "../../redux/slices/incomeSlice";
import $axios from "../../axios/axios";

const TransactionItem = ({amount, type, description, fromTitle, fromIcon, toTitle, toIcon, date, id}) => {
    const {transactions} = useSelector(state => state.transactions);
    const {income} = useSelector(state => state.income);
    const {wallets} = useSelector(state => state.wallets);
    const {expenses} = useSelector(state => state.expenses);
    const dispatch = useDispatch();

    const [hover, setHover] = useState(false);

    const [amountInput, setAmountInput] = useState(amount.toFixed(2));
    const inputRef = useRef(null);
    const editRef = useRef();
    const saveRef = useRef();
    const discardRef = useRef();

    const [dateInput, setDateInput] = useState(date);
    const inputDateRef = useRef(null);
    const editDateRef = useRef();
    const saveDateRef = useRef();
    const discardDateRef = useRef();
    
    useEffect(() => {
        inputRef.current.style.width = ((inputRef.current.value.length) * 12) + "px";
        setAmountInput(Number(inputRef.current.value));
    }, [amountInput]);

    const getTransactionType = (type) => {
        if (type === "income") {
            return "Доход";
        }

        if (type === "transfer") {
            return "Перевод";
        }

        if (type === "expense") {
            return "Расход";
        }
    }

    const renderIcon = (type) => {
        if (type === "income") {
            return <img className="transaction__icon" src={fromIcon} alt={fromTitle}/>;
        }

        if (type === "transfer") {
            return <img className="transaction__icon" src={`${process.env.PUBLIC_URL}/images/categories/exchange.png`} alt="Перевод"/>;
        }

        if (type === "expense") {
            return <img className="transaction__icon" src={toIcon} alt={toTitle}/>;
        }
    }

    const onRemove = (id) => {
        dispatch(removeTransaction(id));
        $axios.post(`transactions/remove/${id}`, {});

        const transaction = transactions.find(element => element.id === id);

        if (type === "income") {
            const from = income.find(element => element.id === transaction.fromId);
            const to = wallets.find(element => element.id === transaction.toId);

            dispatch(updateIncomeAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: 0,
            }));

            dispatch(updateWalletAmount({
                id: to.id,
                oldTransactionAmount: -transaction.amount,
                newTransactionAmount: 0,
            }));
        }

        if (type === "transfer") {
            const from = wallets.find(element => element.id === transaction.fromId);
            const to = wallets.find(element => element.id === transaction.toId);

            dispatch(updateWalletAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: 0,
            }));
            dispatch(updateWalletAmount({
                id: to.id,
                oldTransactionAmount: -transaction.amount,
                newTransactionAmount: 0,
            }));
        }

        if (type === "expense") {
            const from = wallets.find(element => element.id === transaction.fromId);
            const to = expenses.find(element => element.id === transaction.toId);
            
            dispatch(updateWalletAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: 0,
            }));
            dispatch(updateExpenseAmount({
                id: to.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: 0,
            }));
        }
    }

    const handleChange = (e) => {
        setAmountInput(e.target.value);

        if (amount.toFixed(2) === e.target.value) {
            hideControllers();
        } else {
            showControllers();
        }
    }

    const submitNewAmount = () => {
        inputRef.current.style.width = ((inputRef.current.value.length) * 12) + "px";
        setAmountInput(inputRef.current.value);
        hideControllers();
        dispatch(changeTransactionAmount({
            id,
            amount: amountInput
        }));

        const transaction = transactions.find(element => element.id === id);

        if (type === "income") {
            const from = income.find(element => element.id === transaction.fromId);
            const to = wallets.find(element => element.id === transaction.toId);

            dispatch(updateIncomeAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: amountInput,
            }));

            dispatch(updateWalletAmount({
                id: to.id,
                oldTransactionAmount: -transaction.amount,
                newTransactionAmount: -amountInput,
            }));
        }

        if (type === "transfer") {
            const from = wallets.find(element => element.id === transaction.fromId);
            const to = wallets.find(element => element.id === transaction.toId);

            dispatch(updateWalletAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: amountInput,
            }));
            dispatch(updateWalletAmount({
                id: to.id,
                oldTransactionAmount: -transaction.amount,
                newTransactionAmount: -amountInput,
            }));
        }

        if (type === "expense") {
            const from = wallets.find(element => element.id === transaction.fromId);
            const to = expenses.find(element => element.id === transaction.toId);
            
            dispatch(updateWalletAmount({
                id: from.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: amountInput,
            }));
            dispatch(updateExpenseAmount({
                id: to.id,
                oldTransactionAmount: transaction.amount,
                newTransactionAmount: amountInput,
            }));
        }

        $axios.post(`transactions/changeamount/${id}`, {newAmount: amountInput});
    }

    const showControllers = () => {
        editRef.current.style.display = "none";
        saveRef.current.style.display = "inline";
        discardRef.current.style.display = "inline";
    }

    const hideControllers = () => {
        setAmountInput(Number(inputRef.current.value));
        editRef.current.style.display = "inline";
        saveRef.current.style.display = "none";
        discardRef.current.style.display = "none";
    }
    
    const handleDateChange = (e) => {
        setDateInput(e.target.value);
        if (date === e.target.value) {
            hideDateControllers();
        } else {
            showDateControllers();
        }
    }

    const showDateControllers = () => {
        editDateRef.current.style.display = "none";
        saveDateRef.current.style.display = "inline";
        discardDateRef.current.style.display = "inline";
    }

    const hideDateControllers = () => {
        setDateInput(inputDateRef.current.value);
        editDateRef.current.style.display = "inline";
        saveDateRef.current.style.display = "none";
        discardDateRef.current.style.display = "none";
    }

    const submitNewDate = () => {
        const transaction = transactions.find(element => element.id === id);

        dispatch(changeTransactionDate({
            id: transaction.id,
            date: dateInput
        }));

        $axios.post(`transactions/changedate/${id}`, {newDate: dateInput});

        hideDateControllers();
    }

    return(
        <div className="transaction">
            {
                renderIcon(type)
            }
            <div className="transaction__description">
                <span className="transaction__description__type">{getTransactionType(type)}</span>
                <div className="transaction__description__date-container">
                    <input
                        ref={inputDateRef}
                        type="date" 
                        onChange={(e) => handleDateChange(e)} 
                        className="transaction__date__input"
                        value={dateInput}
                    />
                    <img
                        ref={editDateRef}
                        src={`${process.env.PUBLIC_URL}/images/edit/edit.png`} alt="edit" className="transaction__amount__edit"
                        onClick={(e) => {inputDateRef.current.focus(); hideDateControllers()}}/>
                    <img
                        ref={saveDateRef}
                        onMouseOver={() => saveDateRef.current.src = `${process.env.PUBLIC_URL}/images/edit/save_dark.png`} 
                        onMouseLeave={() => saveDateRef.current.src = `${process.env.PUBLIC_URL}/images/edit/save.png`} 
                        src={`${process.env.PUBLIC_URL}/images/edit/save.png`} alt="save" className="transaction__amount__save"
                        onClick={submitNewDate}/>
                    <img
                        ref={discardDateRef}
                        onMouseOver={() => discardDateRef.current.src = `${process.env.PUBLIC_URL}/images/edit/discard_dark.png`} 
                        onMouseLeave={() => discardDateRef.current.src = `${process.env.PUBLIC_URL}/images/edit/discard.png`} 
                        src={`${process.env.PUBLIC_URL}/images/edit/discard.png`} alt="discard" className="transaction__amount__discard"
                        onClick={(e) => {inputDateRef.current.value = date; hideDateControllers()}}/>
                </div>
                <div className="transaction__description__info">
                    <span className="transaction__description__wallet">{fromTitle}</span>
                    {
                        type !== "expense" 
                            ?
                                <>
                                    <span className="transaction__description__arrow">
                                        <img src={`${process.env.PUBLIC_URL}/images/categories/arrow.png`} alt="" />
                                    </span>
                                    <span className="transaction__description__wallet">{toTitle}</span>
                                </>
                            : null
                     }
                </div>
            </div>
            <div className="transaction__description">
                <span className="transaction__description__text">{description}</span>
            </div>
            <div className="transaction__amount">
                <input
                    ref={inputRef}
                    type="number" 
                    onChange={(e) => handleChange(e)} 
                    className="transaction__amount__text-input"
                    value={amountInput}
                />
                <span className="transaction__amount__text" onClick={(e) => inputRef.current.focus()}>MDL</span>
                <img
                    ref={editRef}
                    src={`${process.env.PUBLIC_URL}/images/edit/edit.png`} alt="edit" className="transaction__amount__edit"
                    onClick={(e) => {inputRef.current.focus(); submitNewAmount()}}/>
                <img
                    ref={saveRef}
                    onMouseOver={() => saveRef.current.src = `${process.env.PUBLIC_URL}/images/edit/save_dark.png`} 
                    onMouseLeave={() => saveRef.current.src = `${process.env.PUBLIC_URL}/images/edit/save.png`} 
                    src={`${process.env.PUBLIC_URL}/images/edit/save.png`} alt="save" className="transaction__amount__save"
                    onClick={submitNewAmount}/>
                <img
                    ref={discardRef}
                    onMouseOver={() => discardRef.current.src = `${process.env.PUBLIC_URL}/images/edit/discard_dark.png`} 
                    onMouseLeave={() => discardRef.current.src = `${process.env.PUBLIC_URL}/images/edit/discard.png`} 
                    src={`${process.env.PUBLIC_URL}/images/edit/discard.png`} alt="discard" className="transaction__amount__discard"
                    onClick={(e) => {inputRef.current.value = amount.toFixed(2); hideControllers()}}/>
            </div>
            <div>
                <img onClick={() => onRemove(id)} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} className="transaction__remove" src={hover ? `${process.env.PUBLIC_URL}/images/categories/remove_hover.png` : `${process.env.PUBLIC_URL}/images/categories/remove.png`} alt="remove"/>
            </div>
        </div>
    )
}

export default TransactionItem;