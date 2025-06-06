import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImages from "../../utils/uploadImage";


const SignUp=() =>{
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext)

  const navigate=useNavigate();
  
  //handle sign up form submit
  const handleSignUp=async (e) =>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp API call
    try{

      //Upload image if present
      if(profilePic){
        const imgUploadRes=await uploadImages(profilePic);
        profileImageUrl=imgUploadRes.imageUrl||"";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl,
      });

      console.log("Sign up response:", response.data);

      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);

        toast.success("Registered Successfully!!");

        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Sign-up error:", error); 
      console.log("Backend response:", error?.response?.data);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
  }
}
};

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          {/* 
          Renders the ProfilePhotoSelector component
          Passes the current selected image (profilePic) as 'image' prop
          Passes the setProfilePic function to allow updating the image when user selects a new one */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="Samhita"
              type="text"
            />

            <Input
              value={email}
              onChange={({target})=>setEmail(target.value)}
              label="Email Address"
              placeholder="samhita@gmail.com"
              type="text"
            />
            <div className="col-span-1 sm:col-span-2">
              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"     /* if the type given any other like text eye slash doesnt appear */
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;
