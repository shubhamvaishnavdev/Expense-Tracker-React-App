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
      text: 'Income vs Expense Comparison',
    },
  },
};

const getFormattedDate = (date) => {
  return String(date.getDate()).padStart(2, '0');
};

const ComparisonVerticalBar = ({ filteredIncomeData, filteredExpenseData }) => {
  const currentDate = new Date(); // Initialize currentDate here
  const currentMonth = currentDate.getMonth();
  currentDate.setDate(1); // Start from the first day of the month

  const labels = [];
  const dataPoints = [];

  while (currentDate.getMonth() === currentMonth) {
    const formattedDate = getFormattedDate(currentDate);

    const incomeSum = filteredIncomeData.reduce((sum, data) => {
      const dataDate = new Date(data.Date);
      if (dataDate.getDate() === currentDate.getDate()) {
        return sum + data.Income;
      }
      return sum;
    }, 0);

    const expenseSum = filteredExpenseData.reduce((sum, data) => {
      const dataDate = new Date(data.Date);
      if (dataDate.getDate() === currentDate.getDate()) {
        return sum + data.Expense;
      }
      return sum;
    }, 0);

    labels.push(formattedDate);

    dataPoints.push({
      income: incomeSum,
      expense: expenseSum,
    });

    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: dataPoints.map((data) => data.income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expense',
        data: dataPoints.map((data) => data.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='h-full w-full'>
      <Bar options={options} data={data} className='h-full w-full mx-auto' />
    </div>
  );
};

export default ComparisonVerticalBar;
