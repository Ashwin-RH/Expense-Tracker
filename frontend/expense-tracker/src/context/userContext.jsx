// userContext.jsx
// This file sets up a global UserContext using React Context API.
// It helps manage the logged-in user's data throughout the app.
// 
// - `user`: stores the current user's info (initially null)
// - `updateUser(userData)`: updates the user state after successful login
// - `clearUser()`: resets the user state to null (used during logout)
//
// The <UserProvider> wraps the entire app and makes `user`, `updateUser`, and `clearUser` 
// available to all components via `useContext(UserContext)`.
// 
// This avoids prop drilling and simplifies access to authentication state.

import React,{createContext,useState} from "react";

export const UserContext=createContext();

const UserProvider=({children})=>{
    // State to store current user data; initially null since no user is logged in
    const [user,setUser]=useState(null);

    //Function to update user data with new data
    const updateUser=(userData)=>{  //userData is the new data received (usually after login).
        setUser(userData);          //setUser(userData) saves this data into the user state.
    };

    //Function to clear user data(e.g., on logout)
    const clearUser=()=>{
        setUser(null);
    };

    return (
        <UserContext.Provider   //This returns a context provider that makes user, updateUser, and clearUser available to all components inside it.
        value={{                //Props
            user,
            updateUser,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;


// UserContext:	    Holds shared user state
// UserProvider:	Wraps the app with context access
// updateUser:	    Sets user data (e.g., after login)
// clearUser:	    Clears user data (e.g., on logout)

{/*🔧 Props:
value={{ user, updateUser, clearUser }}: This is the context value that can be accessed via useContext(UserContext) in any child component.

{children}: Refers to any nested components that are wrapped inside <UserProvider>...</UserProvider>.
*/}