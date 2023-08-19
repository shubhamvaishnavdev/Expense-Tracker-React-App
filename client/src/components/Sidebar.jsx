import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <div className='h-[100vh] w-[100%] bg-blue-600 border-2 border-black flex flex-col justify-center items-center'>
      <div className={`w-full flex flex-wrap justify-between items-center p-2 border-b-2 border-black md:hidden `}>
        <p className='text-white font-bold' >Expense tracker</p>
        <AiOutlineClose onClick={() => setIsOpen(false)}
          className='text-white text-2xl font-extrabold ml-auto mr-2' />
      </div>
     
        <div className='h-auto w-full flex flex-col gap-4 justify-center items-center m-auto '>
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
