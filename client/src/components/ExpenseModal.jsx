import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";


const ExpenseModal = ({ isOpen, setIsOpen, createData, expenseData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [data, setData] = useState({
        Title: "",
        Expense: "",
        Category: "",
        Desc: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    function handleDateChange(e) {
        setSelectedDate(e.target.value);
    }


    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear() % 100; 
        return `${day}/${month}/${year}`;
    }



    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true); // Show the loader  

        try {
            const newData = {
                Title: data.Title,
                Expense: data.Expense,
                Date: new Date(selectedDate),
                Category: data.Category.toLowerCase(),
                Desc: data.Desc,
            };
            createData(newData)
            setIsOpen(false);
        } catch (error) {
            console.error("Error sending data at Expense form: ", error);
        }
        setIsLoading(false); // Hide the loader
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

                            <h1 className=" text-3xl font-extrabold text-white mb-2">Add Expense</h1>

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
                                    onChange={handleDateChange}
                                    className="focus:outline-none p-1 bg-gray-200 text-black"
                                />

                                <label htmlFor="Title" className='nlock text-white font-semibold '>Title</label>
                                <input type="text"
                                    placeholder='Grocery'
                                    id='Title'
                                    name='Title'
                                    value={data.Title}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />

                                <label htmlFor="Expense" className='nlock text-white font-semibold '>Expense</label>
                                <input type="text"
                                    placeholder='2499'
                                    id='Expense'
                                    name='Expense'
                                    value={data.Expense}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />


                                <label htmlFor="Category" className='nlock text-white font-semibold '>Category</label>
                                <input type="text"
                                    placeholder='Add category'
                                    id='Category'
                                    name='Category'
                                    list='categoryOptions'
                                    value={data.Category}
                                    onChange={(e) => handleChange(e)}
                                    className='focus:outline-none p-1 bg-gray-200 text-black'
                                />
                                <datalist id="categoryOptions">
                                    {expenseData.map((item) => (
                                        <option key={item._id} value={item.Category} />
                                    ))}
                                </datalist>

                                <label htmlFor="Desc" className='nlock text-white font-semibold '>Description</label>
                                <textarea id='Desc'
                                    name='Desc'
                                    placeholder='Purchase Grocery'
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
                                            className='mt-4 py-1 px-2 bg-black text-white'
                                        >Add</button>)
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseModal;