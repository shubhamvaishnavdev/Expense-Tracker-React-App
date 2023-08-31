import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { updateExpense } from "../Slices/ExpenseDataSlice"


const EditExpenseModal = ({ isOpen, setIsOpen, selectedId }) => {

    const [selectedDate, setSelectedDate] = useState("");
    const [data, setData] = useState({
        Date: "",
        Title: "",
        Expense: "",
        Category: "",
        Desc: ""
    });
    const dispatch = useDispatch();
    const ExpenseData = useSelector((state) => state.ExpenseData.value)
    const loading = useSelector(state => state.ExpenseData.loading)


    function inputFormatDate(inputDate) {
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = String(inputDate.getFullYear());
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        async function extractExpense() {
            if (ExpenseData.length !== 0 && selectedId) {
                const filteredData = ExpenseData.find((item) => item._id === selectedId);
                setSelectedDate(inputFormatDate(new Date(filteredData.Date)))
                if (filteredData) {
                    const newData = {
                        Date: inputFormatDate(new Date(filteredData.Date)),
                        Title: filteredData.Title,
                        Expense: filteredData.Expense,
                        Category: filteredData.Category,
                        Desc: filteredData.Desc
                    };
                    setData(newData);
                }
            }
        }

        extractExpense();
    }, [selectedId]);



    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    function handleDateChange(e) {
        setSelectedDate(prev => e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const convertedDate = new Date(selectedDate + 'T00:00:00.000+00:00').toISOString();
        try {
            dispatch(updateExpense({
                Title: data.Title,
                Expense: data.Expense,
                Date: convertedDate,
                Category: data.Category.toLowerCase(),
                Desc: data.Desc, selectedId
            }))


        } catch (error) {
            console.error("Error sending data at Expense form: ", error);
        }
        if (loading === false) {
            setIsOpen(false); // Hide the loader
            setData({
                Date: "",
                Title: "",
                Expense: "",
                Category: "",
                Desc: ""
            })
        }
    }

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${isOpen ? "flex" : "hidden"} fixed left-0 top-0  h-full w-full items-center justify-center bg-black bg-opacity-50 py-10  `}>

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-full w-[80%] max-w-xl overflow-y-auto sm:rounded-2xl md:w-[30%] bg-blue-600">
                <AiOutlineClose
                    onClick={() => setIsOpen(false)}
                    className='absolute text-3xl font-bold text-white top-2 right-2' />

                <div className="h-full w-full">
                    <div className="px-8 pt-8 w-auto mx-auto">
                        <div className="mb-8">

                            <h1 className=" text-3xl font-extrabold text-white mb-2">Update Expense</h1>

                            <form
                                onSubmit={handleSubmit}
                                className='flex flex-col'>

                                <label htmlFor="Date" className="block text-white font-semibold">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="Date"
                                    name="Date"
                                    value={selectedDate}
                                    onChange={(e) => handleDateChange(e)}
                                    className="focus:outline-none p-1 bg-gray-200 text-black"
                                />

                                <label htmlFor="Title" className='nlock text-white font-semibold '>Title</label>
                                <input type="text"
                                    placeholder='Salary  '
                                    id='Title'
                                    name='Title'
                                    value={data.Title}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />

                                <label htmlFor="Expense" className='nlock text-white font-semibold '>Expense</label>
                                <input type="text"
                                    placeholder='1000'
                                    id='Expense'
                                    name='Expense'
                                    value={data.Expense}
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
                                    loading ? (
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

export default EditExpenseModal;