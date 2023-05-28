const User = require('../models/User')
const Speech = require('../models/Speech')
//to keep us from using too much try-catch code
const asyncHandler = require('express-async-handler')

// @desc Create a speech
// @route POST /speech
// @access Private
const createSpeech = asyncHandler(async (req,res) =>{
    //get info for speech from req body
    const {content} = req.body

    const currentUser = await User.findById(req.user.id)
    const userId = currentUser.id
    //if there is no content then send a message
    if(!content){
        return res.status(400).json({message: 'Enter your speech content'})
    }
    //create the speech 
    const speechObject = {userId, content}
    const speech = await Speech.create(speechObject)

    if(!speech){
        return res.status(400).json({message: 'Could not post'})
    }
    res.status(200).json({message: `Posted: ${speech.content}`})
})

// @desc Delete a speech
// Route /DELETE /speeches
// @access Private
const deleteSpeech = asyncHandler(async (req,res) =>{
    const speech = await Speech.findById(req.body.id)
    if(!speech){
        return res.status(400).json({message: 'Could not find speech'})
    }
    if(speech.userId = req.body.id){
        await Speech.deleteOne()
        return res.status(200).json({message: 'Speech Deleted'})
    }
    else{
        return res.status(500).json({message: 'Unexpected Error'})
    }
})

// @desc Get all speeches of a User
// @route GET /speeches
// @access Private
const getUserSpeeches = asyncHandler(async (req,res) => {
    const id = req.params.id
    const speeches = await Speech.find({userId: id}).sort({
        createdAt:-1
    })
    if(!speeches?.length){
        return res.status(400).json({message: 'No speeches found'})
    }
    res.status(200).json(speeches)
})

// @desc Like a speech
// @route PATCH /speeches/like
// @access Private
const like = asyncHandler(async (req,res) =>{
    //get the speech the user wants to like
    const speech = await Speech.findById(req.params.id)
    if(speech.userId == req.user.id){
        return res.status(400).json({message: 'Cannot like your own speech'})
    }
    //if the likes of that tweet doesnt include the users id
    if(!speech.likes.includes(req.user.id)){
        await speech.updateOne({$push: {likes: req.user.id}})
        return res.status(200).json({message: 'Liked'})
    }
    //otherwise unlike the tweet
    else{
        await speech.updateOne({$pull: {likes: req.user.id}})
        return res.status(200).json({message: 'Disliked'})
    }

})

// @desc Get speeches for feed
// @route GET /speeches/feed
// @access Private
const getFeed = asyncHandler(async (req,res) =>{
    //find the current user
    const user = await User.findById(req.params.id)
    //get all the current users speeches
    const userSpeeches = await Speech.find({userId: user._id})
    //go through the current users following and get speeches of those users
    const following = await Promise.all(
        user.following.map((followId) =>{
            return Speech.find({userId: followId})
        })
    )
    //bring both lists of speeches together
    var feed = userSpeeches.concat(...following)
    //if there is nothing in the feed, then send a message
    if(feed.length == 0){
        return res.status(200).json({message: 'Post a speech or follow others to populate your feed'})
    }
    
    feed = feed.sort((a,b) => {
        if(a.createdAt > b.createdAt){
            return -1
        }
       
    })
    res.status(200).json(feed)
})


// @desc Get speeches for explore page
// @route GET /speeches/explore
// @access Private
const getExplore = asyncHandler(async (req,res) =>{
    //get speeches that have likes, sort from most to least
    const explore = await Speech.find({
        likes: {$exists: true},
    }).sort({likes:-1})

    console.log("test")
    if(!explore){
        return res.status(200).json({message: 'Explore page is empty right now, come back later'})
    }
    res.status(200).json(explore)



})
module.exports = {
    createSpeech,
    deleteSpeech,
    getUserSpeeches,
    like,
    getFeed,
    getExplore
}