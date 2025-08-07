import React, { useContext, useState } from 'react'; // ✅ added useState
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from "react-router-dom";
import CharAvatar from '../Cards/CharAvatar';
import toast from 'react-hot-toast';
import { LuSettings } from "react-icons/lu";

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
    <div className='w-50 h-[calc(100vh-61px)] md:w-63 md:h-[calc(100vh-61px)] bg-gray-900 border-r border-gray-400/50 p-5 shadow-xl shadow sticky top-[61px] z-20 flex flex-col justify-between backdrop-blur-[2px]'>

      <div>
        <div className='flex justify-end'>
      <div className='flex items-center justify-center text-white text-xl p-2 border-1 border-transparent rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-md hover:shadow-black/30 duration-500 transition-all cursor-pointer'>
        <Link to="/settings">
          <LuSettings size={23} />
        </Link>
      </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>

        {user?.profileImageUrl && !imgError ? ( // ✅ show image only if no error
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            onError={() => setImgError(true)} // ✅ catch broken image
            className='w-23 h-23 bg-slate-400 rounded-full border-2 border-white/20 shadow-md hover:shadow-lg hover:scale-105 duration-500 shadow-gray-600/30 cursor-pointer transition-transform'
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className='text-white font-medium leading-6'>
          {user?.fullName || ""}
        </h5>
      </div>

            {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-3 text-[15px] py-3 px-6 rounded-lg mb-3
            border border-b border-gray-100/10 cursor-pointer hover:bg-gray-800/50
            hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20
            duration-300 transition-all transform-gpu will-change-transform
            ${
              activeMenu === item.label
                ? 'border border-orange-500 text-white bg-gradient-to-r from-red-500 to-orange-500 opacity-80 hover:shadow-orange-500/10'
                : 'bg-gray-800/10 text-white'
            }
            ${item.className ?? ''}
            `}
        >
          <item.icon className="text-xl" />
          <span className="truncate">{item.label}</span>
        </button>
      ))}
      </div>

      
      <div className='text-center text-sm text-gray-400/70 px-4 pb-4 cursor-pointer hover:text-white/70 transition duration-300'>
      &copy;  Ashwin Haragi
      
    </div>
    </div>
  );
};

export default SideMenu;
