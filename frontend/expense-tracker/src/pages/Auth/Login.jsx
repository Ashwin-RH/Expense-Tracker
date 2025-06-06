/*
  - Uses React hooks (`useState`, `useContext`) to manage state and user data.
  - Handles form submission with client-side validation for email and password.
  - Sends a POST request to the login API using Axios.
  - On success:
    → Stores token in localStorage.
    → Updates user context globally.
    → Shows success toast.
    → Navigates to dashboard.
  - On error:
    → Displays server-provided or generic error message.
  - Uses `AuthLayout` for page layout and reusable `Input` components for form fields.
*/


import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast"; 

const Login =() =>{
  const [email, setEmail]=useState(""); //state variables - email and password to store form inputs(const thus cant change)
  const [password, setPassword]=useState("");
  const [error, setError]=useState(null);    //const [stateVariable, setStateFunction] = useState(initialValue);


  const {updateUser}= useContext(UserContext);  //To update users info globally

  const navigate=useNavigate(); //To redirect user to other pages

  //handle login form - it runs when the login form is submitted
  const handleLogin=async(e) => {
    e.preventDefault(); //prevent form submission refresh

    if (!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){   //if password not entered show error
      setError("Please enter the password");
      return;
    }

    setError(""); //clear any previous errors, if validation passes

    //Login API call

    // Attempt to log in by sending email and password to the backend.
      // Makes a POST request to the login API using Axios.
      // await pauses until the server responds.
      // The response contains { token, user }.
    // On successful response, extract token and user data.
    // If token is present:
    // - Save token in localStorage to maintain session.
    // - Update the global user context with user info.
    // - Show a success toast notification.
    // - Redirect user to the dashboard page.

    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const{token,user}=response.data;  // Extract token and user info from response

      if(token){
        localStorage.setItem("token",token);  // save token in browser storage
        updateUser(user);                     // update global user context
        
        toast.success("Login successful!");

        navigate("/dashboard");
      }
    } catch(error){
      console.error("Login error:", error);
      if(error.response && error.response.data.message){
        setError(error.response.data.message);         //show error from backend
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter details to log in
        </p>

        {/* Call handleLogin function when the form is submitted*/}
        <form onSubmit={handleLogin}>  
          <Input
          value={email}
          // When the user types in the input, update the 'email' state with the current input value
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="samhita@example.com" /* samhita meaning put together,organized ,related to accounting*/
          type="text"
          /> 
      
          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters" 
          type="password"
          /> 

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary"> {/*when clicked, it triggers the form's onSubmit event,it calls handleLogin() */}
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form> 
      </div>
    </AuthLayout>
  );
};

export default Login;


{/*
This line is used in an <input> element in React to update the component's state when the user types something.

onChange: This is an event handler that listens for changes in the input field.

({ target }) => setEmail(target.value):
This is an arrow function using destructuring to extract target from the event object.
target.value gives the current value typed in the input field.
setEmail(...) updates the email state with this value.
*/}

//As the user types in the email input, this line instantly updates the email state with the latest value, keeping your component in sync with the UI.