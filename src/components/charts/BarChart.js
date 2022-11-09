import { useEffect } from "react";
import { useRef } from "react";
import "./barchart.scss";

const BarChart = ({values, labels, width, height}) => {
    const hexColors = ["#1abc9c", "#f1c40f", "#fab1a0", "#2980b9", "#e74c3c", "#34495e", "#9b59b6", "#199e3d", "#182bb8", "#d91c81", "#bbc714", "#b5610d"];

    let maxValue = Math.max(...values);
    maxValue = Math.round(maxValue);
    const stepLength = 10;
    const stepValue = Math.round(maxValue / 100) * 10;

    const stepValues = [];

    let initialValue = 0;
    for (let i = 0; i < stepLength; i++) {
        stepValues.push(initialValue + stepValue)
        initialValue = initialValue + stepValue;
    }

    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.width = width;
        ctx.height = height;
        
        ctx.beginPath();
        ctx.moveTo(40, height);
        ctx.lineTo(40, 20);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.strokeCap = "square";
        ctx.stroke();
        ctx.closePath();

        let y = 0;

        for (let i = 0; i < stepLength; i++) {
            ctx.beginPath();
            ctx.textAlign = "left";
            ctx.fillStyle = "black";
            ctx.font = "800 14px Nunito";
            ctx.fillText(stepValues[i], 0, height - y);
            ctx.closePath();
            y += 30;
        }
        
        let x = 50;

        let barHeight = 0;
        let barWidth = (canvas.width - 160) / values.length;

        for (let i = 0; i < values.length; i++) {
            barHeight = values[i] * 100 / stepValues[stepLength - 1];
            barHeight = barHeight * (ctx.height - 35) / 100;
            barHeight = Number(barHeight.toFixed(2));

            ctx.beginPath();
            ctx.rect(x, canvas.height, barWidth, -barHeight);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fillStyle = hexColors[i];
            ctx.fill();
            ctx.closePath();

            x = x + barWidth + 10;
        }

        ctx.beginPath();
        ctx.moveTo(40, height);
        ctx.lineTo(width - 20, height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
        // eslint-disable-next-line 
    }, []);

    return(
        <div className="bar-container">
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
    )
}

export default BarChart;