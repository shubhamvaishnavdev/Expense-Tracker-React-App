import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { getAllIncome, deleteIncome, createIncome } from "../Slices/IncomeDataSlice"
import { IncomeList, IncomeModal } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';

const Income = () => {
  const [isOpen, setIsOpen] = useState(false);
  const incomeData = useSelector(state => state.IncomeData.value)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIncome());
  }, [dispatch,createData])

  function handleDelete(id) {
    dispatch(deleteIncome(id))
  }

  function createData(data) {
    dispatch(createIncome(data))
    dispatch(getAllIncome());
  }

  return (
    <div className='relative w-[100%] h-full '>
      <AiFillPlusCircle
        onClick={() => setIsOpen(true)}
        className='fixed text-sky-600 text-5xl m-auto bottom-6 left-[6%] border-2 bg-transparent border-none md:bottom-6 md:left-[16%]' />
      <IncomeModal isOpen={isOpen} setIsOpen={setIsOpen} createData={createData} incomeData={incomeData} />
      <IncomeList incomeData={incomeData} handleDelete={handleDelete} type={"INCOME"} />
    </div>
  )
}

export default Income;