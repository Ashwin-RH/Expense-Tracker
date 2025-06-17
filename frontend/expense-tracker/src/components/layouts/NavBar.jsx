import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';

const NavBar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu]=useState(false);
  return (
    <div className='flex gap-5 bg-black/30 shadow-md border border-b border-gray-900 backdrop-blur-[8px] py-4 px-7 sticky top-0 z-30'>
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

        <h2 className='text-lg font-medium text-white'>Stash Up</h2>

        {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu}/>
            </div>    
        )}    
    </div>
    
  )
}

export default NavBar;
