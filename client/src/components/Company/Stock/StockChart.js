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

function StockChart(props) {
  console.log("props.data: " + JSON.stringify(props.data))
    var history_data = props.data.data;
    var prices = [];
    var dates = new Set();
    var dict = {};

    if(history_data != null && typeof(history_data) != undefined && history_data.length > 0)
    {

      for (var i = 0; i < history_data.length; i++) {
        var cur = history_data[i];
        if (cur && cur.Date && cur.Close) {
            var date = cur.Date;
            var closing_price = cur.Close;

            // Change "2023-06-25" -> "06-2023"
            const array = date.split("-");
            const year = array[0];
            const month = array[1];
            const formattedDate = `${month}-${year}`;

            // Add date to set
            dates.add(formattedDate);
            if (!dict[formattedDate]) 
                dict[formattedDate] = [];
            dict[formattedDate].push(parseFloat(closing_price));
        } else {
            console.error("Invalid data:", cur);
        }
    }
    //Calculate the average of each month
    for(const key in dict)
    {
        var sum = 0.0;
        const value = dict[key];

        for(const val of value)
            sum += val;
        const average = sum / value.length;
        const roundedAverage = parseFloat(average.toFixed(2)); // Round to 2 decimal points
        console.log("avg for the month of " + key + " is " + roundedAverage)
        prices.push(roundedAverage);
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            // display: true,
            text: "Line Chart: Monthly Sales Trend for Products A & B",
          },
        },
      }
      
      //reverse
      prices = prices.reverse();
      const labels = [...dates]
      .map(dateString => {
        const [month, year] = dateString.split("-");
        // Construct a Date object with year, month (subtracting 1 because JavaScript months are zero-based), and day 1
        return new Date(year, month - 1, 1);
      })
      .sort((a, b) => a - b) // Sort the Date objects
      .map(dateObject => {
        // Format the Date object back to the desired string format "mm-yyyy"
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const year = dateObject.getFullYear();
        return `${month}-${year}`;
      });

      //if this stock is down, view red color line. Up, view blue
      const beginning = prices[0];
      const ending = prices[prices.length - 1];
      console.log("differetnce: " + ending - beginning);
      const down = ending - beginning < 0 ? true : false;
      const color = down ? "rgb(255, 99, 132)" : "rgba(0,204,0)";

      const data = {
        labels,
        datasets: [
        //   {
        //     label: "Product A Sales",
        //     data: productASales,
        //     borderColor: "rgb(255, 99, 132)",
        //     backgroundColor: "rgba(255, 99, 132)",
        //   },
          {
            label: "Avg price for each month",
            data: prices,
            borderColor: color,
            backgroundColor: color,
          },
        ],
      }

    return (
        <Line options={options} data={data} /> 
    )
    }
}
export default StockChart;