import { useEffect, useRef } from "react";
import "./pieChart.scss";

const PierChart = ({data, width, height, hideLegens}) => {
    const canvasRef = useRef();

    const hexColors = ["#1abc9c", "#f1c40f", "#fab1a0", "#2980b9", "#e74c3c", "#34495e", "#9b59b6", "#e67e22"];

    const drawPie = (x, y, radius, start, end, wise, ctx, color, text) => {
        const axisX = x + (radius / 2) * Math.cos((start / 2) + (end / 2));
        const axisY = y + (radius / 2 - 2) * Math.sin((start / 2) + (end / 2));

        ctx.save();
        ctx.beginPath();
        
        ctx.arc(x, y, radius, start, end, wise);
        ctx.lineTo(x, y);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
 
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "18px Nunito";
        ctx.strokeText(text, axisX, axisY);
        ctx.fillText(text, axisX, axisY);
        
        ctx.stroke();
        ctx.restore();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        const x = 200;
        const y = 260;
        const radius = 200;

        const filteredExpenses = data.filter(item => item.amount > 0);
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

    useEffect(() => {
        if (hideLegens) return

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        const filteredExpenses = data.filter(item => item.amount > 0);
        const totalExpenses = filteredExpenses.reduce((prev, curr) => prev + curr.amount, 0);
        const expensesData = filteredExpenses.map(item => Number((item.amount * 100 / totalExpenses).toFixed(2)));
        const expensesTitles = filteredExpenses.map(item => item.title);
        const expensesAmounts = filteredExpenses.map(item => item.amount);
        const expensesCurrencies = filteredExpenses.map(item => item.currency);

        let axisY = 10;

        for (let i = 0; i < expensesData.length; i++) {
            ctx.beginPath();
            ctx.rect(425, axisY + 80, 30, 30)
            ctx.lineWidth = 1;
            ctx.fillStyle = hexColors[i];
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();

            ctx.textAlign = "left";
            ctx.fillStyle = "black";
            ctx.font = "600 18px Nunito";
            ctx.fillText(`${expensesTitles[i]} - ${expensesAmounts[i]} ${expensesCurrencies[i]}`, 460, axisY + 100);
            ctx.closePath();

            axisY = axisY + 40;
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (hideLegens) return
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "700 32px Nunito";
        ctx.fillText("Статистика расходов", width / 2, 50);
        ctx.closePath();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="chart-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default PierChart;