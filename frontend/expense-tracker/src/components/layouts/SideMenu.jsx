import React, { useContext, useState } from 'react'; // ✅ added useState
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import CharAvatar from '../Cards/CharAvatar';
import toast from 'react-hot-toast';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [imgError, setImgError] = useState(false); // ✅ track image load error
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      toast.success("Logged Out successfully!");
      setTimeout(() => {
        handlelogout();
      }, 1000);
      return;
    }
    navigate(route);
  };

  const handlelogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-gray-400/50 border-r border-gray-200/50 p-5 shadow-xl shadow-gray-400 sticky top-[61px] z-20 flex flex-col justify-between backdrop-blur-[2px]'>

      <div>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>

        {user?.profileImageUrl && !imgError ? ( // ✅ show image only if no error
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            onError={() => setImgError(true)} // ✅ catch broken image
            className='w-20 h-20 bg-slate-400 rounded-full object-cover hover:shadow-lg shadow-gray-400 cursor-pointer'
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className='text-gray-950 font-medium leading-6'>
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
  <button
    key={`menu_${index}`}
    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 
      shadow-md shadow-gray-500/60 border border-b border-gray-200/50 cursor-pointer 
      hover:shadow-xl transition 
      ${
        activeMenu === item.label
          ? 'border-1 border-purple-500 text-white bg-purple-500'
          : 'bg-white/50'
      }`}
    onClick={() => handleClick(item.path)}
  >
    <item.icon className="text-xl" />
    {item.label}
  </button>
))}
      </div>

      
      <div className='text-center text-sm text-gray-500 px-4 pb-4 cursor-pointer hover:text-gray-700'>
      &copy;  Ashwin Haragi
      
    </div>
    </div>
  );
};

export default SideMenu;
