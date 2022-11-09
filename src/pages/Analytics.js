import { useSelector } from "react-redux";
import BarChart from "../components/charts/BarChart";
import Pie from "../components/charts/Pie";
import "../styles/pagesStyles/analytics.scss";

const Analytics = () => {
    const {expenses} = useSelector(state => state.expenses);

    const filteredExpenses = expenses.filter(item => item.amount > 0);
    const values = [...filteredExpenses.map(item => item.amount)];
    const labels = [...filteredExpenses.map(item => item.title)];

    return(
        <div className="analytics-page">
            <Pie values={values} labels={labels} width={450} height={450}/>
            <BarChart values={values} labels={labels} width={750} height={300}/>
        </div>
    )
}

export default Analytics;