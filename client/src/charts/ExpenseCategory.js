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
      text: 'Expense based on Category',
    },
  },
};



const ExpenseCategory = ({ filteredExpenseData}) => {  
  const labels = filteredExpenseData.map((data) => data.Category);

  const data = {
    labels,
    datasets: [
      {
        label: 'Expense',
        data: filteredExpenseData.map((data) => data.Expense),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='h-full w-full'>
      <Bar options={options} data={data} className='h-full w-full mx-auto'/>
    </div>
  );
};

export default ExpenseCategory;
