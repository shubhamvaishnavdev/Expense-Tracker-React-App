import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"


const AllInfoViewModal = ({ viewInfo, setViewInfo, allData, viewDataId,type }) => {

  const extractedData = allData.find(item => item._id === viewDataId);

  return (
    <div
      onClick={() => setViewInfo(false)}
      className={`${viewInfo ? "flex" : "hidden"} fixed left-0 top-0  h-full w-full items-center justify-center bg-black bg-opacity-50 py-10  `}>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-auto w-[70%] p-6 max-w-xl overflow-y-auto rounded-2xl md:w-[40%] bg-blue-600">
        <AiOutlineClose
          onClick={() => setViewInfo(false)}
          className='absolute text-3xl font-bold text-white top-2 right-2 ' />

        {extractedData && (
          <div className="h-full w-full mt-4">
            <h1 className=" text-3xl font-extrabold text-white mb-2">Income Details</h1>
            <div className="p-2 w-auto mx-auto text-white font-semibold">
            <p><b>Title: </b>{`${extractedData.Title}`}</p>
            {
              type === "INCOME" ?
              (<p><b>Income: </b>{`₹${extractedData.Income}`}</p>):
              (<p><b>Expense: </b>{`₹${extractedData.Expense}`}</p>)
            }
              
              <p><b>Date: </b>{`${new Date(extractedData.Date).getDate()}/${String(new Date(extractedData.Date).getMonth() + 1).padStart(2, '0')}/${new Date(extractedData.Date).getFullYear()}`}</p>
              <p><b>Category: </b>{`${extractedData.Category}`}</p>
              <p><b>Description: </b>{`${extractedData.Desc}`}</p>
            </div>
          </div>
        )}


      </div>
    </div>

  )
}

export default React.memo(AllInfoViewModal);