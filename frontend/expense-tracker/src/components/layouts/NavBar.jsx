import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';
import OCRScanButton from "../../components/OCRScanButton";

const NavBar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu]=useState(false);
  return (
    <div className='flex gap-5 bg-black/30 shadow-md border border-b border-gray-900 backdrop-blur-[8px] py-4 px-7 sticky top-0 z-30'>
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
        <div className=' flex-1 flex justify-end items-center gap-4'>
            <OCRScanButton/>
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
