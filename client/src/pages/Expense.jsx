import React, { useEffect, useState } from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import { getAllExpense, deleteExpense, createExpense } from "../Slices/ExpenseDataSlice"
import {useSelector,useDispatch} from "react-redux"
import { ExpenseModal, ExpenseList } from '../components';

const Expense = () => {

  const [isOpen, setIsOpen] = useState(false);
  const expenseData = useSelector(state => state.ExpenseData.value)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpense());
  }, [dispatch])

  function handleDelete(id) {
    dispatch(deleteExpense(id))
  }

  function createData(data){
    dispatch(createExpense(data))
    dispatch(getAllExpense());
  }


  return (
    <div className='relative w-[100%] min-h-[100dvh] bg-#F3F4F6'>
      <AiFillPlusCircle
        onClick={() => setIsOpen(!isOpen)}
        className='fixed text-sky-600 text-5xl m-auto bottom-6 left-[6%] border-2 bg-transparent border-none md:bottom-6 md:left-[16%]' />
      <ExpenseModal isOpen={isOpen} setIsOpen={setIsOpen} createData={createData} expenseData={expenseData} />
      <ExpenseList expenseData={expenseData} handleDelete={handleDelete} type={"EXPENSE"} />
    </div>
  )
}

export default Expense;