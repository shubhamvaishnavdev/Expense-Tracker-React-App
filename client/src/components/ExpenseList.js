import React, {  useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import {EditExpenseModal, LoadingSpinner} from "../components/"
import { AiOutlineEye } from "react-icons/ai"
import AllInfoViewModal from './AllInfoViewModal';
import { useSelector } from 'react-redux';
const ExpenseList = ({expenseData, handleDelete, type}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [viewDataId, setviewDataId] = useState('')
    const [viewInfo, setViewInfo] = useState(false)
    const loading = useSelector(state => state.ExpenseData.loading)

    function handleUpdateExpense(id) {
        setSelectedId(id);
        setIsOpen(true);

    }

    function handleViewData(id) {
        setViewInfo(true)
        setviewDataId(id);
    }


    return (
     <div className='w-[100%] h-full flex flex-col gap-2 p-4' >
            <EditExpenseModal isOpen={isOpen} setIsOpen={setIsOpen} selectedId={selectedId} />
            {loading ?
            (<LoadingSpinner/>):
            (expenseData.length === 0 ?
                (<p className='text-center text-xl font-bold text-gray-600' >Add Expenses From below</p>) :
                (expenseData.map((data) => (
                    <div key={data._id} className=' flex flex-wrap items-center justify-between px-8  border-2 border-black '>
                        <p className='text-xl text-black' >{data.Title}</p>
                        <div className='flex flex-wrap items-center justify-between gap-4'>
                            <p className='text-lg font-bold text-green-600' >{` ₹${data.Expense}`} </p>
                            <AiOutlineEye
                                onClick={() => handleViewData(data._id)}
                                className='text-2xl hover:text-sky-600 ' />

                            <AiOutlineEdit
                                onClick={() => handleUpdateExpense(data._id)}
                                className='text-2xl hover:text-sky-600 ' />

                            <AiOutlineDelete
                                onClick={() => handleDelete(data._id)}
                                className='text-2xl hover:text-sky-600' />
                        </div>
                    </div>)
                )))
            }
            {
               viewInfo ?  (<AllInfoViewModal
                viewInfo={viewInfo}
                setViewInfo={setViewInfo}
                viewDataId={viewDataId}
                allData={expenseData}
                type={type}
               />) : ""
            }
        </div>
  )
}

export default ExpenseList;