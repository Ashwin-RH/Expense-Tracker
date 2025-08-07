import { FaUser, FaLock, FaMoneyBillAlt, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoMdClose, IoMdLogOut } from 'react-icons/io';
import { MdLanguage, MdOutlineDarkMode, MdViewAgenda } from 'react-icons/md';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { GiWallet } from 'react-icons/gi';
import DashboardLayout from './layouts/DashboardLayout';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { validateEmail } from '../utils/helper';
import { API_PATHS } from '../utils/apiPaths';
import axios from 'axios';

const Settings = () => {

  const SettingItem = ({ icon, label, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-4 p-4 rounded-xl bg-gray-800/60 hover:bg-gray-700/80 hover:shadow-2xl hover:shadow-black/20 cursor-pointer transition ${className}`}
  >
    <div className="text-xl">{icon}</div>
    <div className="text-sm font-medium">{label}</div>
  </div>
);

    
    const navigate=useNavigate();

      const [modal, setModal] = useState(null); // 'profile' | 'password' | '2fa'

      // const { user, clearUser, name, setName, email, setEmail} = useContext(UserContext); //for current user values. This will pre-fill the input fields

      const { user, clearUser } = useContext(UserContext);

      const [name, setName] = useState(user?.fullName || '');
      const [email, setEmail] = useState(user?.email || '');

      const [oldPassword, setOldPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');

      const [showOldPassword,setShowOldPassword] = useState(false);
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      

      const handleClick = (route) => {
        if(route === "/logout"){
            toast.success("Logged Out successfully!");
            setTimeout(() => {
                handleLogout();
            },1000);
        }else{
            navigate(route);
        }
      };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/Login");
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email) {
    toast.error("Please fill the required fields");
    return;
  }

  if (!validateEmail(email)) {
    toast.error("Invalid email address");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      API_PATHS.USER.UPDATE_PROFILE,  // replace with your backend URL
      { fullName: name,
         email:email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Profile updated!");
    setModal(null);
    
    // Optional: update UserContext here
    setName(response.data.fullName);
    setEmail(response.data.email);

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Update failed");
  }
};

const handleChangePassword = async (e) => {
  e.preventDefault();

  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill in all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New passwords do not match");
    return;
  }

  try {

    const token = localStorage.getItem("token");
    // Make PATCH request to your backend
    const res = await axios.patch(
      `${API_PATHS.AUTH.CHANGE_PASSWORD}`,
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message || "Password updated!");
    setShowOldPassword('');
    setShowNewPassword('');
    setShowConfirmPassword('');
    setModal(null); // Close the modal
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <DashboardLayout activeMenu="Settings">
    <div className=" p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      {/* Account Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3"> Account Settings</h2>
        <div className="space-y-3">
          <SettingItem icon={<FaUser />} label="Edit Profile" onClick={() => setModal('profile')} className=''/>
          <SettingItem icon={<FaLock />} label="Change Password" onClick={() => setModal('password')} />
          <SettingItem icon={<RiShieldKeyholeLine />} label="Two-Factor Authentication" onClick={() => setModal('2fa')} />
          <SettingItem icon={<IoMdLogOut />} label="Logout" onClick={() => handleClick("/logout")} />
        </div>
      </div>

      {/* App Preferences */}
      <div>
        <h2 className="text-xl font-semibold mb-3"> App Preferences</h2>
        <div className="space-y-4">
          <SettingItem icon={<PiCurrencyCircleDollar />} label="Currency Selection" />     
          <SettingItem icon={<GiWallet />} label="Set Monthly Budget Limit" />
        </div>
      </div>

       {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-20 bg-transparent backdrop-blur-xs flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-600 rounded-xl p-4 md:p-6 max-w-md w-[85%] md:w-full relative shadow-lg shadow-gray-600/30">

            {modal === 'profile' && (
              <div className='flex flex-col gap-4'>
                <div className=' flex items-center justify-between'>
                <h2 className="text-lg md:text-xl font-bold  ">Edit Profile</h2>
                <button onClick={() => setModal(null)} className=" text-white text-xl p-1  hover:bg-gray-700 rounded-full duration-500 cursor-pointer"><IoMdClose size={24}/></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input 
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)} //This makes your inputs controlled components — meaning React fully manages the values.
                        placeholder='Full Name'
                        className='rounded-lg border border-gray-600 p-2'
                    />
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'
                        className='rounded-lg border border-gray-600 p-2'
                    />
                    <button type="submit" className='rounded-lg mx-auto p-1 w-[70%] md:w-[50%] border border-indigo-500/40 bg-indigo-500/40 hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer'>Edit the Changes</button>
                </form>
              </div>
            )}

            {modal === 'password' && (
              <div className='flex flex-col '>
                <div className='flex items-center justify-between mb-4'>
                <h3 className="text-lg md:text-xl font-bold ">Change Password</h3>
                <button onClick={() => setModal(null)} className=" text-white text-xl p-1  hover:bg-gray-700 rounded-full duration-500 cursor-pointer"><IoMdClose size={24}/></button>
                </div>
                <form onSubmit={handleChangePassword} className='flex flex-col gap-3 mb-3'>
                  <div className='flex border border-gray-600 rounded-lg p-2 items-center justify-between'>
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className='outline-none'
                    />
                                <>
                                  {showOldPassword?(
                                    <FaRegEye
                                      size={22}
                                      className="text-indigo-500 cursor-pointer"
                                      onClick={()=> setShowOldPassword(false)}
                                    /> 
                                    ):(
                                    <FaRegEyeSlash
                                      size={22}
                                      className="text-slate-400 cursor-pointer"
                                      onClick={()=> setShowOldPassword(true)}
                                    />
                                    )}
                                  </>
                  </div>
                    
                  <div className='flex items-center justify-between border border-gray-600 rounded-lg p-2'>
                    <input 
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='outline-none'
                    />
                                <>
                                  {showNewPassword?(
                                    <FaRegEye
                                      size={22}
                                      className="text-indigo-500 cursor-pointer"
                                      onClick={()=> setShowNewPassword(false)}
                                    /> 
                                    ):(
                                    <FaRegEyeSlash
                                      size={22}
                                      className="text-slate-400 cursor-pointer"
                                      onClick={() => setShowNewPassword(true)}
                                    />
                                    )}
                                  </>
                      </div>  
                    <div className='flex items-center justify-between border border-gray-600 rounded-lg p-2'>
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='outline-none'
                    />
                                <>
                                  {showConfirmPassword?(
                                    <FaRegEye
                                      size={22}
                                      className="text-indigo-500 cursor-pointer"
                                      onClick={()=> setShowConfirmPassword(false)}
                                    /> 
                                    ):(
                                    <FaRegEyeSlash
                                      size={22}
                                      className="text-slate-400 cursor-pointer"
                                      onClick={() => setShowConfirmPassword(true)}
                                    />
                                    )}
                                  </>
                                  </div>              
                    
                </form>
                <button onClick={handleChangePassword} className='rounded-lg p-1 w-[70%] md:w-[50%] mx-auto bg-indigo-500/40 hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer '>Change Password</button>
              </div>
            )}

            {modal === '2fa' && (
              <div className='flex flex-col gap-4'>
                <h3 className="text-xl font-bold mb-4">Two-Factor Authentication</h3>
                <button onClick={() => setModal(null)} className=" text-white text-xl p-1  hover:bg-gray-700 rounded-full duration-500 cursor-pointer"><IoMdClose size={24}/></button>
                <form className='flex flex-col gap-3'>
                    <input 
                        type='text'
                        placeholder='Authentication Code'
                        className='border'
                    />
                </form>
                <button className='border'>Enable 2FA</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};



const SettingItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/60 hover:bg-gray-700/80 cursor-pointer transition"
  >
    <div className="text-xl">{icon}</div>
    <div className="text-sm font-medium">{label}</div>
  </div>
);

export default Settings;
