const User = require('../models/User'); // Check relative path carefully
console.log('User model:',User);

const jwt=require("jsonwebtoken");

//Generate JWT token
const generateToken=(id)=>{
    return jwt.sign({id },process.env.JWT_SECRET,{expiresIn:"1h"})
}

//Register User
exports.registerUser=async(req,res)=>{
    const {fullName,email,password,profileImageUrl}=req.body;

    //Validation: Check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        //check if email already exits
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already in use"});
        }

        //create the user
        const user=await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }catch(err){
        res.status(500)
        .json({message:"Error registering user",error:err.message});
    }
};

// Update User Profile Controller
exports.updateUserProfile = async (req, res) => {
    try {
        // 1. Create an empty object to store fields to be updated
        const updates = {};

        // 2. Add only the fields present in the request body
        // This ensures partial updates (like just name or just email)
        if (req.body.fullName) updates.fullName = req.body.fullName;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.profileImageUrl) updates.profileImageUrl = req.body.profileImageUrl;

        // 3. Find the user by ID (provided via JWT middleware) and apply updates
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,            // User ID from authenticated request (req.user is set by middleware)
            { $set: updates },      // Apply only updated fields
            { new: true, runValidators: true } // Return updated doc and validate input
        ).select("-password");     // Exclude password field from the response

        // 4. If user not found (e.g., invalid ID), return 404
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 5. Respond with the updated user (excluding password)
        res.status(200).json(updatedUser);
    } catch (err) {
        // 6. Handle any server/database errors
        res.status(500).json({
            message: "Error updating profile",
            error: err.message,
        });
    }
};


//Login User
exports.loginUser=async(req,res)=>{
    const{email,password} =req.body;
 if(!email || !password){
    return res.status(400).json({message:"All fields are required"});
 }
 try{
    const user=await User.findOne({email})
    if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({message:"Invalid credentials"});
    }
    res.status(200).json({
        id:user._id,
        user,
        token:generateToken(user._id),
    });
 }catch(err){
    res.status(500)
        .json({message:"Error logging in user",error:err.message}); 
 }
};

//Get User info
exports.getUserInfo=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }catch (err){
        res.status(500)
        .json({message:"Error fetching user info",error:err.message}); 
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required" });
    }
    
    if (oldPassword === newPassword) {
        return res.status(400).json({ message: "New password must be different from old password" });
        }


    try {
        const user = await User.findById(req.user.id);
        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to change password", error: err.message });
    }
};
