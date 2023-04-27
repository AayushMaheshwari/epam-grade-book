import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // import Chart.js modules
import { Bar } from 'react-chartjs-2'; // import React wrapper for Chart.js


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // register Chart.js modules


const BarGraph=(props)=>{

    const {barData}=props;

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // specify legend position
          },
          title: {
            display: true,
            text: 'Students Marks', // specify chart title
          },
        },
      };
      
      const labels = ['Average', 'Max', 'Min']; // define x-axis labels
      const data = {
        labels,
        datasets: [
          {
            label: 'Students', // specify dataset label
            data: barData, // generate random data
            backgroundColor: 'rgb(0,78,0)', // specify bar color
          },
        ],
      };

      return (
        <div className='barGraphWrapper'>
          <h1>Students Marks</h1>
            <Bar options={options} data={data} />
        </div>
      )
}


export default BarGraph;
