import withBalance from "../../hoc/withBalance";
import withTitleAndDrag from "../../hoc/withTitleAndDrag";
import IncomeForm from "../transactionForms/IncomeForm";
import TransferForm from "../transactionForms/TransferForm";
import ExpenseForm from "../transactionForms/ExpenseForm";
import add from "../../assets/images/add.png";
import "./categoryPanel.scss";
import CreateForm from "../transactionForms/CreateForm";
import EditForm from "../transactionForms/EditForm";
import convertCurrencySymbol from "../../utils/convertCurrencySymbol";
import convertBalance from "../../utils/convertBalance";

const CategoryPanel = ({categoryType, data, balance, title, canDrag, fromCategory, setFromCategory, toCategory, setToCategory, openModal, closeModal}) => {
    const onDragStart = (item) => {
        setTimeout(() => {
            setFromCategory(item)
        }, 0);
    }

    const onDragOver = (e, item) => {
        e.preventDefault();
        setToCategory(item);
    }

    const onDragDrop = (item) => {
        if (fromCategory === toCategory) return

        if (fromCategory.categoryName === 'incomeSources' && toCategory.categoryName === 'wallets') {
            openModal(<IncomeForm to={toCategory} from={fromCategory} title={"Доход"} closeModal={closeModal}/>);
        }
        
        if (fromCategory.categoryName === 'wallets' && toCategory.categoryName === 'expenses') {
            openModal(<ExpenseForm to={toCategory} from={fromCategory} title={"Расход"} closeModal={closeModal}/>);
        }

        if (fromCategory.categoryName === 'wallets' && toCategory.categoryName === 'wallets') {
            openModal(<TransferForm to={toCategory} from={fromCategory} title={"Перевод"} closeModal={closeModal}/>);
        }
    }

    const onCreateCategory = () => {
        openModal(<CreateForm type={categoryType} title={"Новая категория"} closeModal={closeModal}/>);
    }

    const onChangeCategory = (item) => {
        openModal(<EditForm type={categoryType} currentTitle={item.title} currentIcon={item.thumbnail} currentCurrency={item?.currency} id={item.id} title={"Редактирование"} closeModal={closeModal}/>);
    }


    return(
        <div className="category__container category">
            <div className="category__header">
                <span className="category__header-title">{title}</span>
                <span className="category__header-balance">{Number(balance).toFixed(2)} MDL</span>
            </div>
            <div className="category__content content">
                <ul className="content__list list">
                    {
                        data
                            ?
                            data.map(item => {
                                return(
                                    <li onDrop={() => onDragDrop(item)} onDragOver={(e) => onDragOver(e, item)} onDragStart={() => onDragStart(item)} draggable={canDrag} key={item.id} onClick={() => onChangeCategory(item)} className="list__item">
                                        <span className="list__title">{item.title}</span>
                                        <div className="list__icon">
                                            <img onDragStart={() => onDragStart(item)} draggable={canDrag} src={item.thumbnail} alt={item.title}/>
                                        </div>
                                        <span className="list__balance">{convertBalance(item.amount, item.currency).toFixed(2)} {convertCurrencySymbol(item.currency)}</span>
                                    </li>
                                )
                            })
                            :
                        null
                    }
                    <li className="list__item">
                        <div className="list__icon list__add">
                            <img onClick={onCreateCategory} src={add} alt="Add category"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default withTitleAndDrag(withBalance(CategoryPanel));