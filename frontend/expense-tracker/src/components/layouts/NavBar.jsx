import React, { useContext, useState } from 'react'
import { HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';
import OCRScanButton from "../../components/OCRScanButton";
import { IoMdLogOut } from "react-icons/io";
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const NavBar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu]=useState(false);
    const {user,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (path) => {
  if (path === "/logout") {
    toast.success("Logged out successfully!");

    setTimeout(() => {
      localStorage.removeItem("token");
      clearUser();
      navigate("/login");
    }, 1000);
  } else {
    navigate(path);
  }
};



  return (
    <div className='flex gap-5 bg-black/30 shadow-md border border-b border-gray-900 backdrop-blur-[8px] py-4 px-7 sticky top-0 z-20'>
        <div className=' flex items-center gap-3'>
        <button
            className='block lg:hidden text-white hover:scale-105 duration-300 cursor-pointer'
            onClick={() => setOpenSideMenu(!openSideMenu)}
            >
            {openSideMenu?(
                <HiOutlineX className='text-2xl '/>
            ):(
                <HiOutlineMenu className='text-2xl '/>
            )}
        </button>

        <a
            href='/dashboard'
         className='text-lg font-medium text-white hover:scale-105 duration-500 transition-transform'>Stash Up</a>
         </div>
        <div className=' flex-1 flex justify-end items-center gap-5'>
            <OCRScanButton/>
            <IoMdLogOut size={28} title='Logout' onClick={() => handleClick("/logout")} className='block md:hidden text-white rounded-full border border-gray-800/70 focus:text-red-500 focus:bg-gray-800/70 active:scale-95 ' />
            </div>
        {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu}/>
            </div>    
        )}    
    </div>
    
  )
}

export default NavBar;
