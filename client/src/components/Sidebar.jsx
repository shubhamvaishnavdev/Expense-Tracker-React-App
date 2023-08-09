import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='h-screen w-[100%] bg-blue-600 border-2 border-black'>
      <div className='flex flex-col gap-4 items-center t-32'>
        <Link to='/' className={`w-full text-center  text-white ${location.pathname === '/' ? ' text-xl font-bold border-2 border-white bg-black transition-background duration-1000' : ' text-lg font-medium'}`}>
          Dashboard
        </Link>
        <Link to='/income' className={`w-full text-center  text-white ${location.pathname === '/income' ? ' text-xl font-bold border-2 border-white bg-black transition-background duration-1000' : ' text-lg font-medium'}`}>
          Income
        </Link>
        <Link to='/expense' className={`w-full text-center  text-white ${location.pathname === '/expense' ? ' text-xl font-bold border-2 border-white bg-black transition-background duration-1000' : ' text-lg font-medium'}`}>
          Expense
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
