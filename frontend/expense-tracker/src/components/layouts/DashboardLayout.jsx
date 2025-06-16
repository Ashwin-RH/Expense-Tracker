import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import NavBar from './NavBar';
import SideMenu from './SideMenu';


const DashboardLayout = ({ children, activeMenu }) => {
     const { user }=useContext(UserContext)
  return (
    <div className='min-h-screen bg-gray-900'>
        <NavBar activeMenu={activeMenu}/>

        {user && (
            <div className='flex pt-[5px]'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>

                <div className='grow mx-5'>{children}</div>
            </div>
        )}
    </div>
  );
};

export default DashboardLayout;
