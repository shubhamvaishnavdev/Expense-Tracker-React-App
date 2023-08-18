import React, {  useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import EditIncomeModal from './EditIncomeModal';
import { AiOutlineEye } from "react-icons/ai"
import AllInfoViewModal from './AllInfoViewModal';

const IncomeList = ({incomeData, handleDelete, type}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [viewDataId, setviewDataId] = useState('')
    const [viewInfo, setViewInfo] = useState(false)


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
            {incomeData.length === 0 ?
                (<p className='text-center text-xl font-bold text-gray-600' >Add Income From below</p>) :
                (incomeData.map((data) => (
                    <div key={data._id} className=' flex flex-wrap items-center justify-between px-8  border-2 border-black '>
                        <p className='text-xl text-black' >{data.Title}</p>
                        <div className='flex flex-wrap items-center justify-between gap-4'>
                            <p className='text-lg font-bold text-green-600' >{` ₹${data.Income}`} </p>
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
                ))
            }
            {
               viewInfo ?  (<AllInfoViewModal
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