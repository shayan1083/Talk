const User = require('../models/User')
const Speech = require('../models/Speech')
//to keep us from using too much try-catch code
const asyncHandler = require('express-async-handler')
//this will be used to hash password
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc Get one user by id
// @route GET /users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) =>{
    // const {id} = req.body
    const user = await User.findById(req.params.id).select('-password')
    if(!user){
        return res.status(400).json({message: 'No user found'})
    }
    res.json(user)
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req,res)=> {
    const {id, fname, lname, username, email, password} = req.body

    //if the entered user id isnt the same as the logged in user then you can update it
    if(id !== req.user.id){
        return res.status(403).json({message: 'Login to this account to update it'})
    }

    //check for duplicate email if user entered a new email
    if(email){
        const dupeEmail = await User.findOne({email}).lean().exec()
        if(dupeEmail && dupeEmail?._id.toString() !== id){
            return res.status(409).json({message: 'A user with this email already exists'})
        }
    }
    
    //check for duplicate username if user entered a new username
    if(username){
        const dupeUser = await User.findOne({username}).lean().exec()
        if(dupeUser && dupeUser?._id.toString() !== id){
            return res.status(409).json({message: 'A user with this username already exists'})
        }
    }

    //update the user with the parameters in the request body
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { 
            $set: req.body
        },
        {
            new: true
        }
    );
    
   
    if(password) {
        //hash password
        user.password = await bcrypt.hash(password, 10)
    }

    //const updatedUser = await user.save()

    if(updateUser){
        res.status(200).json({message: 'Sucessfully updated user'})
    }
    else{
        res.status(403).json({message: 'Could not update user'})
    }
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req,res)=> {
    const id = req.params.id

    //if there is no id then we cant delete an account
    if(!id){
        return res.status(400).json({message: 'User id required'})
    }
    //if the id entered is not the same as the id of the user we cant delete the user
    if(id !== req.user.id){
        return res.status(403).json({message: 'Login to this account to delete it'})
    }

    //delete all speeches made by the user 
    await Speech.deleteMany({userId: req.user.id})

    //find and delete the user
    const user = await User.findByIdAndDelete(id).exec()

    if(!user){
        res.json({message: 'No user found'})
    }
    const reply = `Username ${user.username} with id ${user._id} deleted`
    res.json(reply)

})

// @desc follow another user
// @route PATCH /users/follow/:id
// @access Private
const follow = asyncHandler(async (req,res) =>{
    //get user we want to follow
    const user = await User.findById(req.params.id)
    //current user
    const currentUser = await User.findById(req.user.id)

    if(!user.followers.includes(currentUser.id)){
        await user.updateOne({
            $push: {followers: currentUser.id}
        })
        await currentUser.updateOne({
            $push: {following: req.params.id}
        })
    }
    else{
        res.status(403).json({message: 'You already follow this user'})
    }

    res.status(200).json({message: `Now following ${user.username}`})
})

// @ desc unfollow a user
// @ route PATCH /users/unfollow/:id
// @ access Private
const unfollow = asyncHandler(async (req,res) =>{
    //get user we want to follow
    const user = await User.findById(req.params.id)
    //current user
    const currentUser = await User.findById(req.user.id)

    if(currentUser.following.includes(req.params.id)){
        await user.updateOne({
            $pull: {followers: currentUser.id}
        })
        await currentUser.updateOne({
            $pull: {following: req.params.id}
        })
    }
    else{
        res.status(403).json({message: 'You dont follow this user'})
    }

    res.status(200).json({message: `Unfollowed ${user.username}`})
})

// @desc Logout
// @route POST /users/logout
// @access Private - to clear cookie if it exists
const logout = asyncHandler(async (req,res) =>{
    const cookies = req.cookies
    if(!cookies?.access_token) return res.sendStatus(204) //No content
    res.clearCookie('access_token', {httpOnly: true})
    res.status(200).json({message: 'Logged Out Successfully'})
})

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    follow,
    unfollow,
    logout
}