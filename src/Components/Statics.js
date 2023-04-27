import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statics=(props)=> {

    const {graphData}=props;

    const data = {
        labels: ['Final Grade (46.2 - 50.1)', '(Final Grade 50.8 - 52.0)', 'Final Grade (52.6 - 52.6)', 'Final Grade (53.2 - 54.6)', 'Final Grade More than 8'],
        datasets: [
          {
            title: 'Grade Score Graph',
            label: 'Final Grade',
            data: graphData,
            backgroundColor: [
              'rgb(8,337,0)',
              'rgb(13,242,0)',
              'rgb(29,188,0)',
              'rgb(14,155,0)',
              'rgb(8,137,0)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return(
    <div className='wrapperStat'>
        <h1>Grade Score Graph</h1>
        <Doughnut data={data} />
    </div>
  )
}

export default Statics;