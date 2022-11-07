import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Savings = () => {
    const canvasRef = useRef(null);

    const {expenses} = useSelector(state => state.expenses);
    const hexColors = ["#1abc9c", "#f1c40f", "#fab1a0", "#2980b9", "#e74c3c", "#34495e", "#9b59b6", "#e67e22"];

    const drawPie = (x, y, radius, start, end, wise, ctx, color, text) => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.arc(x, y, radius, start, end, wise);
        ctx.lineTo(x, y);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        const axisX = x + (radius / 2) * Math.cos((start / 2) + (end / 2));
        const axisY = y + (radius / 2 - 2) * Math.sin((start / 2) + (end / 2));

        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "18px Nunito";
        ctx.fillText(text, axisX, axisY);
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const radius = 300;

        const filteredExpenses = expenses.filter(item => item.amount > 0);
        const totalExpenses = filteredExpenses.reduce((prev, curr) => prev + curr.amount, 0);
        const expensesData = filteredExpenses.map(item => Number((item.amount * 100 / totalExpenses).toFixed(2)));
        const expensesInRadians = expensesData.map(item => 2 * Math.PI * item / 100);

        let prev, curr = 0;

        for (let i = 0; i < expensesData.length; i++) {
            prev = curr;
            curr = expensesInRadians[i] + prev;
            drawPie(x, y, radius, prev, curr, false, ctx, hexColors[i], `${expensesData[i]}%`);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div>
            <canvas
                ref={canvasRef}>
            </canvas>
        </div>
    )
}

export default Savings;