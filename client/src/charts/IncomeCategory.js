import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Income based on Category',
    },
  },
};



const IncomeCategory = ({ filteredIncomeData }) => {  
  const labels = filteredIncomeData.map((data) => data.Category);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: filteredIncomeData.map((data) => data.Income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className='h-full w-full'>
      <Bar options={options} data={data} className='h-full w-full mx-auto'/>
    </div>
  );
};

export default IncomeCategory;
