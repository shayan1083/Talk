const User = require('../models/User')
//to keep us from using too much try-catch code
const asyncHandler = require('express-async-handler')
//this will be used to hash password
const bcrypt = require('bcrypt')
//jwt token 
const jwt = require('jsonwebtoken')

// @desc Create a user
// @route POST /auth/signup
// @access Public
const createUser = asyncHandler(async (req,res)=> {
    //get info from request body
    const {fname, lname, username, email, password } = req.body
    
    //Confirm data
    if(!fname || !lname || !username || !email || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    //check for duplicate email or username
    const dupeEmail = await User.findOne({email}).lean().exec()
    const dupeUser = await User.findOne({username}).lean().exec()
    if(dupeEmail){
        return res.status(409).json({message: 'A user with this email already exists'})
    }
    if(dupeUser){
        return res.status(409).json({message: 'A user with this username already exists'})
    }

    //hash password
    const hashedPass = await bcrypt.hash(password, 10) //10 salt rounds

    //creat user object with hashed password to store in database 
    const userObject = {fname, lname, username, email, "password": hashedPass}

    //create and store new user
    const user = await User.create(userObject)

    //create access token
    const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET)

    //if user is created then send message otherwise error
    if(user){
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({message: `User ${username} successfully created`})
    }
    else{
        res.status(400).json({message: 'Inavlid user data recieved'})
    }
    
})

// @desc Login
// @route POST /auth/signin
// @access Public
const login = asyncHandler(async (req,res)=> {
    //get info from request body
    const {email, password} = req.body    
    //Confirm data
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'})
    }
    //find a user with the email
    const user = await User.findOne({email}).exec()

    //if there is no user with that email, return error message
    if(!user){
        return res.status(400).json({message: `No user with email: ${email} found`})
    }
    //if there is a user, then compare the password entered to actual password
    const compare = await bcrypt.compare(password, user.password);
    if(!compare){
        return res.status(400).json({message: 'Password is incorrect'})
    }
    //create access token
    const accessToken = jwt.sign(
        {id: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'}
        )

    //creat refresh token
    const refreshToken = jwt.sign(
        {"username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    //send message with cookie 
    res.cookie('access_token', accessToken,{httpOnly:true}).status(200).json({message: `Welcome, ${user.username}`})

  
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req,res) =>{
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(400).json({message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err,decoded) =>{
            if(err) return res.status(403).json({message: 'Forbidden'})
            const user = await User.findOne({username: decoded.username})
            if(!user) return res.status(401).json({message: 'Unauthorized'})
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": user.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5m'}
            )
            res.json({accessToken})
        })
    )
}

module.exports = {
    createUser,
    login,
    refresh,
}