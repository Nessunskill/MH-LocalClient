import { createContext, useEffect } from "react";
import { useRef } from "react";
import "./pie.scss";

const Pie = ({values, labels, width, height}) => {
    const canvasRef = useRef();
    const percentagesRef = useRef();
    const labelsRef = useRef();

    const totalValue = values.reduce((prev, curr) => prev + curr, 0);
    const valuesPercentages = values.map(item => Number((item * 100 / totalValue).toFixed(2)));

    const hexColors = ["#1abc9c", "#f1c40f", "#fab1a0", "#2980b9", "#e74c3c", "#34495e", "#9b59b6", "#199e3d", "#182bb8", "#d91c81", "#bbc714", "#b5610d"];

    const drawSlices = (x, y, radius, start, end, wise, ctx, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(x, y, radius, start, end, wise);
        ctx.lineTo(x, y);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    const drawPercentages = (x, y, radius, start, end, wise, ctx, text) => {
        const axisX = x + (radius / 2) * Math.cos((start / 2) + (end / 2));
        const axisY = y + (radius / 2) * Math.sin((start / 2) + (end / 2));
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "700 16px Nunito";
        ctx.fillText(text, axisX, axisY);
        ctx.closePath();
    }

    const drawLabels = (text, color, ctx, y) => {
        ctx.beginPath();
        ctx.rect(15, y + 15, 25, 25);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.textAlign = "left";
        ctx.fillStyle = "black";
        ctx.font = "600 16px Nunito";
        ctx.fillText(text, 45, y + 32);
        ctx.closePath();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.width = width;
        ctx.height = height;

        const x = ctx.width / 2;
        const y = ctx.width / 2;
        const radius = ctx.width / 2;

        const valuesInRadians = valuesPercentages.map(item => (item * 2 * Math.PI) / 100);

        let prev, curr = 0;

        for (let i = 0; i < values.length; i++) {
            prev = curr;
            curr = valuesInRadians[i] + prev;
            drawSlices(x, y, radius, prev, curr, false, ctx, hexColors[i]);
        }
        // eslint-disable-next-line     
    }, [values]);

    useEffect(() => {
        const canvas = percentagesRef.current;
        const ctx = canvas.getContext("2d");
        ctx.width = width;
        ctx.height = height;

        const x = width / 2;
        const y = width / 2;
        const radius = width / 1.7;

        const valuesInRadians = valuesPercentages.map(item => (item * 2 * Math.PI) / 100);

        let prev, curr = 0;

        for (let i = 0; i < values.length; i++) {
            prev = curr;
            curr = valuesInRadians[i] + prev;
            drawPercentages(x, y, radius, prev, curr, false, ctx, `${valuesPercentages[i]}%`);
        }
        // eslint-disable-next-line     
    }, [values]);

    useEffect(() => {
        const canvas = labelsRef.current;
        const ctx = canvas.getContext("2d");

        ctx.width = 300;
        ctx.height = 300;

        let y = 15;

        for (let i = 0; i < labels.length; i++) {
            drawLabels(labels[i], hexColors[i], ctx, y);
            y = y + 35;
        }
    }, [values]);

    return(
        <div className="chart-container">
            <div className="pie-container">
                <canvas width={width} height={height} ref={canvasRef}></canvas>
                <canvas style={{position: "absolute"}} width={width} height={height} ref={percentagesRef}></canvas>
            </div>
            <div className="labels-container">
                <canvas height={500} ref={labelsRef}></canvas>
            </div>    
        </div>
    )
}

export default Pie;