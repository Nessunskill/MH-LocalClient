import PieChart from "../components/charts/PieChart";
import { useSelector } from "react-redux";
import "../styles/pagesStyles/analytics.scss";

const Analytics = () => {
    const {expenses} = useSelector(state => state.expenses);

    return(
        <div className="analytics-page">
            <PieChart data={expenses} width={800} height={600} hideLegens={false} />
        </div>
    )
}

export default Analytics;