import "./transactionsSections.scss";
import TransactionItem from "../transactionItem/TransactionItem";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const TransactionsSections = () => {
    const {transactions} = useSelector(state => state.transactions);
    const [filter, setFilter] = useState("expenses");
    const linksRef = useRef([]);
    
    useEffect(() => {
        linksRef.current = linksRef.current.slice(0, 4);
    }, [filter]);

    const setLinkAsActive = (e, linksRef) => {
        linksRef.current.forEach((item, i) => {
            if (i >= 4) return 
            item.classList.remove("navigation__link_active");
            setFilter(e.target.getAttribute("data-filter"));
        });

        e.target.classList.add("navigation__link_active");
    }

    return(
        <div className="transactions-container transactions">
            <div className="transactions__navigation navigation">
                <ul className="navigation__menu">
                    <li onClick={(e) => setLinkAsActive(e, linksRef)} className="navigation__item">
                        <span data-filter="all" ref={element => linksRef.current.push(element)} className="navigation__link">Все</span>
                    </li>
                    <li onClick={(e) => setLinkAsActive(e, linksRef)} className="navigation__item">
                        <span data-filter="expenses" ref={element => linksRef.current.push(element)} className="navigation__link navigation__link_active">Расходы</span>
                    </li>
                    <li onClick={(e) => setLinkAsActive(e, linksRef)} className="navigation__item">
                        <span data-filter="income" ref={element => linksRef.current.push(element)} className="navigation__link">Доходы</span>
                    </li>
                    <li onClick={(e) => setLinkAsActive(e, linksRef)} className="navigation__item">
                        <span data-filter="transfers" ref={element => linksRef.current.push(element)} className="navigation__link">Переводы</span>
                    </li>
                </ul>
            </div>
            {   
                // eslint-disable-next-line
                transactions.map((item, i) => {
                    if (filter === "all") {
                        // if (i >= 10) return null
                        return <TransactionItem
                            key={item.id}
                            amount={item.amount}
                            type={item.transactionType}
                            description={item.description}
                            fromTitle={item.fromTitle}
                            toTitle={item.toTitle}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            date={item.date}
                            id={item.id}
                            />
                    }
                    if (filter === "expenses" && item.transactionType === "expense") {
                        if (i >= 10) return null
                        return <TransactionItem
                            key={item.id}
                            amount={item.amount}
                            type={item.transactionType}
                            description={item.description}
                            fromTitle={item.fromTitle}
                            toTitle={item.toTitle}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            date={item.date}
                            id={item.id}
                            />
                    }
                    if (filter === "income" && item.transactionType === "income") {
                        if (i >= 10) return null
                        return <TransactionItem
                            key={item.id}
                            amount={item.amount}
                            type={item.transactionType}
                            description={item.description}
                            fromTitle={item.fromTitle}
                            toTitle={item.toTitle}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            date={item.date}
                            id={item.id}
                            />
                    }
                    if (filter === "transfers" && item.transactionType === "transfer") {
                        if (i >= 10) return null
                        return <TransactionItem
                            key={item.id}
                            amount={item.amount}
                            type={item.transactionType}
                            description={item.description}
                            fromTitle={item.fromTitle}
                            toTitle={item.toTitle}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            date={item.date}
                            id={item.id}
                            />
                    }
                })
            }
            {/* <div className="transactions__load-more">
                <button className="transactions__header-button button">Загрузить больше</button>
            </div> */}
        </div>
    )
}

export default TransactionsSections;