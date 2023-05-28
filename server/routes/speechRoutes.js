const express = require('express');
const router = express.Router();
const speechController = require('../contollers/speechController')
const verifyJWT = require('../middleware/verifyToken')

//user needs to be logged in to use these functions
router.use(verifyJWT)

//post a speech 
router.route('/post')
    .post(speechController.createSpeech)

router.route('/')
    //delete a speech
    .delete(speechController.deleteSpeech)

router.route('/explore')
    .get(speechController.getExplore)

router.route('/:id')
    .get(speechController.getUserSpeeches)

router.route('/:id/like')
    .patch(speechController.like)

router.route('/feed/:id')
    .get(speechController.getFeed)



module.exports = router