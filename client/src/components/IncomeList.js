import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import EditIncomeModal from './EditIncomeModal';
import { AiOutlineEye } from "react-icons/ai"
import AllInfoViewModal from './AllInfoViewModal';
import LoadingSpinner from './LoadingSpinner';
import { useSelector } from 'react-redux';

const IncomeList = ({ incomeData, handleDelete, type }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [viewDataId, setviewDataId] = useState('')
    const [viewInfo, setViewInfo] = useState(false)
    const loading = useSelector(state => state.IncomeData.loading)


    function handleUpdateIncome(id) {
        setSelectedId(id);
        setIsOpen(true);

    }

    function handleViewData(id) {
        setViewInfo(true)
        setviewDataId(id);
    }

    return (
        <div className='w-[100%] h-full flex flex-col gap-2 p-4' >
            <EditIncomeModal isOpen={isOpen} setIsOpen={setIsOpen} selectedId={selectedId} />
            {loading ?
                (<LoadingSpinner />) :
                (incomeData.length === 0 ?
                    (<p className='text-center text-xl font-bold text-gray-600' >Add Income From below</p>) :
                    (incomeData.map((data) => (
                        <div key={data._id} className=' flex flex-col flex-wrap items-center justify-between px-8  border-2 border-black md:flex-row'>
                           
                            <div className='w-full flex flex-wrap justify-between md:w-[80%]'>
                                <p className='text-xl text-black' >{data.Title}</p>
                                <p className='text-lg font-bold text-green-600' >{` ₹${data.Income}`} </p>
                            </div>

                            <div className='flex flex-wrap items-center justify-between gap-4'>

                                <AiOutlineEye
                                    onClick={() => handleViewData(data._id)}
                                    className='text-2xl hover:text-sky-600 ' />

                                <AiOutlineEdit
                                    onClick={() => handleUpdateIncome(data._id)}
                                    className='text-2xl hover:text-sky-600 ' />

                                <AiOutlineDelete
                                    onClick={() => handleDelete(data._id)}
                                    className='text-2xl hover:text-sky-600' />
                            </div>
                        </div>)
                    )))
            }
            {
                viewInfo ? (<AllInfoViewModal
                    viewInfo={viewInfo}
                    setViewInfo={setViewInfo}
                    viewDataId={viewDataId}
                    allData={incomeData}
                    type={type}
                />) : ""
            }
        </div>


    )
}

export default IncomeList