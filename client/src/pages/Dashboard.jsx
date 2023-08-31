import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ComparisonVerticalBar from '../charts/ComparisonVerticalBar';
import { getAllIncome } from "../Slices/IncomeDataSlice"
import { getAllExpense } from "../Slices/ExpenseDataSlice"
import IncomeCategory from '../charts/IncomeCategory';
import useLocalStorage from "../utils/useLocalStorage"
import Select from 'react-select';
import ExpenseCategory from '../charts/ExpenseCategory';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const incomeData = useSelector(state => state.IncomeData.value)
  const expenseData = useSelector(state => state.ExpenseData.value)
  const [selectedMonth, setSelectedMonth] = useLocalStorage('month', '');
  const [selectedYear, setSelectedYear] = useLocalStorage('year', '');
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.IncomeData.loading)

  useEffect(() => {
    dispatch(getAllIncome());
    dispatch(getAllExpense());
  }, [])

  useEffect(() => {

    // Calculate total income
    const totalIncome = incomeData.reduce((total, item) => total + item.Income, 0);

    // Calculate total expenses
    const totalExpense = expenseData.reduce((total, item) => total + item.Expense, 0);

    // Calculate balance
    const calculatedBalance = totalIncome - totalExpense;

    setBalance(calculatedBalance);
  }, [incomeData, expenseData]);


  const filteredIncomeData = incomeData.filter(
    (data) =>
      new Date(data.Date).getFullYear() === parseInt(selectedYear) &&
      new Date(data.Date).getMonth() === selectedMonth
  );

  const filteredExpenseData = expenseData.filter(
    (data) =>
      new Date(data.Date).getFullYear() === parseInt(selectedYear) &&
      new Date(data.Date).getMonth() === selectedMonth
  );

  useEffect(() => {
    // Set the default year and month based on available data
    const currentYear = new Date().getFullYear();
    setSelectedYear(selectedYear || currentYear.toString()); // Use the stored value or the current year
    setSelectedMonth(selectedMonth !== '' ? selectedMonth : new Date().getMonth());
  }, [selectedYear, selectedMonth]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  // Extract unique years from incomeData and expenseData
  const years = Array.from(
    new Set([...incomeData.map((data) => new Date(data.Date).getFullYear()), ...expenseData.map((data) => new Date(data.Date).getFullYear())])
  );
  const monthOptions = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  const yearOptions = years.map((year) => ({ value: year, label: year.toString() }));

  return (
    <div className='min-h-full w-[100%] p-4' >
      {
        loading ?
          (<LoadingSpinner />) :
          (<div className='border-black border-2 flex flex-col justify-center items-center flex-wrap md:justify-around md:flex-row'>
            <div className='text-xl flex justify-center items-center my-4'>
              {
                balance >= 0 ?
                  (<span>Balance: <span className='font-bold text-green-600' >₹{balance}</span></span>) :
                  (<span>Balance: <span className='font-bold text-red-600' >₹{balance}</span></span>)
              }
            </div>
            <div className='w-full p-2 flex justify-center items-center md:w-[60%] md:p-0 gap-4' >
              <Select className='w-[10rem]'
                options={monthOptions}
                onChange={handleMonthChange}
                placeholder="Select Month"
                value={monthOptions.find(option => option.value === selectedMonth)} // Set the selected option based on value
              />
              <Select className='w-[10rem]'
                options={yearOptions}
                onChange={handleYearChange}
                placeholder="Select Year"
                value={yearOptions.find(option => option.value === selectedYear)} // Set the selected option based on value
              // value={newData.value} // Set the selected option based on value
              />
            </div>
          </div>)
      }

      {
        loading ?
          (<LoadingSpinner />) :
          (<div className='flex flex-col justify-center items-center gap-4'>
            <div className='h-[40%] md:h-[28rem] w-[100%] pb-8 flex justify-center items-center py-4 '>
              <ComparisonVerticalBar
                filteredIncomeData={filteredIncomeData}
                filteredExpenseData={filteredExpenseData}
              />
            </div>
            <div className='h-[40%] md:h-[28rem] w-[100%] pb-8 flex justify-center items-center py-4 '>
              <IncomeCategory
                filteredIncomeData={filteredIncomeData}
              />
            </div>
            <div className='h-[40%] md:h-[28rem] w-[100%] pb-8 flex justify-center items-center py-4 '>
              <ExpenseCategory
                filteredExpenseData={filteredExpenseData}
              />
            </div>
          </div>)
      }
    </div>
  )
}

export default Dashboard;