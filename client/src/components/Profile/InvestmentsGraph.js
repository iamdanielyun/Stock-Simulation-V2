import CircularProgress from '@mui/material/CircularProgress';
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

function InvestmentsGraph({ labels, values }) {

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
            borderColor: "rgba(0,204,0)",
            backgroundColor: "rgba(0,204,0)",
          },
        ],
    }
    
    return (
        <Line options={options} data={data} /> 
    )

}

export default InvestmentsGraph;