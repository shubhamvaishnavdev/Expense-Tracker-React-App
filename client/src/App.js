import React, { useState } from 'react';
import { Sidebar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import { AiOutlineMenu } from 'react-icons/ai'



const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className='bg-gray-100 flex' >
        <div className={`${isOpen ? 'block w-[60%] z-20' : 'hidden'} fixed top-0 left-0 md:block md:w-[15%] `}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className='w-full md:w-[85%] ml-auto' >
          <div className={` flex flex-wrap justify-between items-center p-4 bg-black text-white mb-4 md:hidden`}>
            <p>Expense tracker</p>
            <AiOutlineMenu
              onClick={() => setIsOpen(true)}
              className='text-white text-2xl' />
          </div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;