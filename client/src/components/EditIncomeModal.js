import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { updateIncome } from "../Slices/IncomeDataSlice"


const EditIncomeModal = ({ isOpen, setIsOpen, selectedId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        Title: "",
        Income: "",
        Desc: ""
    });
    const dispatch = useDispatch();
    const IncomeData = useSelector((state) => state.IncomeData.value)

    useEffect(() => {
        async function extractIncome() {
            if (IncomeData.length !== 0 && selectedId) {
                const filteredData = IncomeData.find((item) => item._id === selectedId);
                if (filteredData) {
                    const newData = {
                        Title: filteredData.Title,
                        Income: filteredData.Income,
                        Desc: filteredData.Desc
                    };
                    setData(newData);
                }
            }
        }

        extractIncome();
    }, [selectedId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

     function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true); // Show the loader  

        try {
            const {Title, Income, Desc} = data;
            dispatch(updateIncome({Title, Income, Desc, selectedId }))
           

        } catch (error) {
            console.error("Error sending data at Income form: ", error);
        }

        setIsLoading(false); // Hide the loader
    }

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${isOpen ? "flex" : "hidden"} fixed left-0 top-0  h-full w-full items-center justify-center bg-black bg-opacity-50 py-10  `}>

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-full w-[30%] max-w-xl overflow-y-auto sm:rounded-2xl bg-blue-600">
                <AiOutlineClose
                    onClick={() => setIsOpen(false)}
                    className='absolute text-3xl font-bold text-white top-2 right-2' />

                <div className="h-full w-full">
                    <div className="px-8 pt-8 w-auto mx-auto">
                        <div className="mb-8">

                            <h1 className=" text-3xl font-extrabold text-white mb-2">Update Income</h1>

                            <form
                                onSubmit={handleSubmit}
                                className='flex flex-col'>
                                <label htmlFor="Title" className='nlock text-white font-semibold '>Title</label>
                                <input type="text"
                                    placeholder='Salary  '
                                    id='Title'
                                    name='Title'
                                    value={data.Title}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />

                                <label htmlFor="Income" className='nlock text-white font-semibold '>Income</label>
                                <input type="text"
                                    placeholder='1000'
                                    id='Income'
                                    name='Income'
                                    value={data.Income}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />

                                <label htmlFor="Desc" className='nlock text-white font-semibold '>Description</label>
                                <textarea id='Desc'
                                    name='Desc'
                                    placeholder='Salary from freelancing'
                                    value={data.Desc}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />
                                {
                                    isLoading ? (
                                        <div type='submit'
                                            className='mt-4 py-1 px-4 bg-black text-white'
                                        >
                                            <div className="mx-auto animate-spin h-6 w-6 border-x-2  border-white rounded-full"></div>
                                        </div>
                                    ) :
                                        (<button type='submit'
                                            onClick={() => setIsOpen(false)}
                                            className='mt-4 py-1 px-2 bg-black text-white'
                                        >Update</button>)
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditIncomeModal