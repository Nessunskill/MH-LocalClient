import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../redux/slices/expensesSlice";
import { fetchIncome } from "../../redux/slices/incomeSlice";
import { fetchTransactions } from "../../redux/slices/transactionsSlice";
import { fetchWallets } from "../../redux/slices/walletsSlice";
import CategoryPanel from "../categoryPanel/CategoryPanel";
import Modal from "../modal/Modal";

import "./categoriesSections.scss";

const CategoriesSections = () => {
    const [fromCategory, setFromCategory] = useState('fromCategory');
    const [toCategory, setToCategory] = useState('toCategory');
    const [showModal, setShowModal] = useState(false);
    const [currentForm, setCurrentForm] = useState("form");

    const {income} = useSelector(state => state.income);
    const {wallets} = useSelector(state => state.wallets);
    const {expenses} = useSelector(state => state.expenses);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIncome());
        dispatch(fetchWallets());
        dispatch(fetchExpenses());
        dispatch(fetchTransactions());
        // eslint-disable-next-line
    }, []);

    const openModal = (formType) => {
        setCurrentForm(formType);
        setShowModal(true);
    }

    const closeModal = (e) => {
        document.addEventListener('keydown', function(event){
            if(event.key === "Escape"){
                setShowModal(false);
            }
        });

        setShowModal(false);
    }

    return(
        <section className="categories__container categories">
            <CategoryPanel categoryType="income" closeModal={closeModal} openModal={openModal} toCategory={toCategory} setToCategory={setToCategory} fromCategory={fromCategory} setFromCategory={setFromCategory} data={income}/>
            <CategoryPanel categoryType="wallets" closeModal={closeModal} openModal={openModal} toCategory={toCategory} setToCategory={setToCategory} fromCategory={fromCategory} setFromCategory={setFromCategory} data={wallets}/>
            <CategoryPanel categoryType="expenses" closeModal={closeModal} openModal={openModal} toCategory={toCategory} setToCategory={setToCategory} fromCategory={fromCategory} setFromCategory={setFromCategory} data={expenses}/>
            {
                showModal ? <Modal showModal={showModal} closeModal={closeModal}>
                    {currentForm}
                </Modal> : null
            }
        </section>
    )
}

export default CategoriesSections;