import React from "react";

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";
import { Toaster } from 'react-hot-toast';
import Intro from '../src/pages/Auth/Intro';
import Settings from "./components/Settings";



const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>    {/* Sets up the routing system (provides routing context to the app).*/}
          <Routes>    {/* Defines which component to render based on the current URL path.*/}
            <Route path="/" element={<Root />} />  {/*The <Root /> component redirects to /dashboard if the user is authenticated (token exists), otherwise to /login. */}
            <Route path="/intro" exact element={<Intro />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />   {/* When a user visits http://yourapp.com/income, React will render the Income component. */}
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/settings" exact element={<Settings />} />
          </Routes>
        </Router>
      </div>

      <Toaster
      toastOptions={{
        className: "",
        style:{
          fontSize:'13px'
        },
      }}
      />
    </UserProvider>
  );
};


const Root = () => {
  // check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token"); //It's a browser-based storage used to save data persistently (like tokens).
                                                          //Think of it as a mini-database in your browser.

  //Redirect to dashboards if authenticated,otheriwse to login (ternary operator)
  return isAuthenticated? ( <Navigate to="/dashboard" /> ):( <Navigate to="/intro"/>
  );
};

export default App;