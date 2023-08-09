import React from 'react';
import { Sidebar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-gray-100 flex' >
        <div className='w-[15%]'>
          <Sidebar />
        </div>
        <div className='w-[85%]' >
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