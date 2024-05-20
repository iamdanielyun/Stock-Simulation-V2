import CircularProgress from '@mui/material/CircularProgress';
import { LineChart } from '@mui/x-charts/LineChart';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

//Register elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function InvestmentsGraph({ labels, values, color }) {
    // Calculate the min and max values for the y-axis
    const maxValue = Math.max(...values) + 3000;

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          }, 
          title: {
            // display: true,
            text: "Investing...",
          },
        },
        scales: {
          x: {
              display: false, // Set to false to hide the x-axis
          },
          y: {
              display: true, // Set to false to hide the y-axis
              min: 0,
              max: maxValue,
          },
      },
        maintainAspectRatio: true
    }

    // const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const prices = [800.54, 900.43, 867.65, 864.23, 654.22, 409.92, 526.65, 480.76, 410.43, 380.55, 590.32, 600.06];
    const data = {
        labels,
        datasets: [
          {
            label: "Portfolio value",
            data: values,
            borderColor: color,
            backgroundColor: color,
            pointRadius: 3,  
            pointHoverRadius: 10
          },
        ],
    }

    return (
        <Line options={options} data={data} /> 
    )

}

export default InvestmentsGraph;