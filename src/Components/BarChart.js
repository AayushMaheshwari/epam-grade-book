import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // import Chart.js modules
import { Bar } from 'react-chartjs-2'; // import React wrapper for Chart.js


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // register Chart.js modules


const BarChart=(props)=>{

    const {barData1,barData2,barData3}=props;
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // specify legend position
          },
          title: {
            display: true,
            text: 'Students Data', // specify chart title
          },
        },
      };
      
      const labels = ['All', 'Passed', 'Failed']; // define x-axis labels
      let barArr=[barData1,barData2,barData3];
      const data = {
        labels,
        datasets: [
          {
            label: 'Students', // specify dataset label
            data: barArr, // generate random data
            backgroundColor: 'rgb(0,78,0)', // specify bar color
          },
        ],
      };

      return (
        <div className='barWrapper'>
          <h1>Stundents Data</h1>
            <Bar options={options} data={data} />
        </div>
      )
}


export default BarChart;
