import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email : email})

    if(user && (await user.matchPassword(password))) {
        generateToken(res , user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
    
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email: email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        generateToken(res , user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt" , "" , {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: "Logged out successfully"})
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) 

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        } 

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const getUsers = asyncHandler(async (req, res) => {
    res.send("Get users")
})

const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete user")
})

const getUserById = asyncHandler(async (req, res) => {
    res.send("Get user by ID")
})

const updateUser = asyncHandler(async (req, res) => {
    res.send("Update user")
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser };
