const express = require('express');
const router = express.Router();
const usersController = require('../contollers/usersController')
const verifyJWT = require('../middleware/verifyToken')

//user needs to be logged in to use these
router.use(verifyJWT)


//get all users
//edit a user profile
//delete a user
router.route('/')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

//get user by an id
router.route('/:id')
    .get(usersController.getUserById)

//follow a user by their id
router.route('/follow/:id')
    .patch(usersController.follow)

//unfollow a user by their id
router.route('/unfollow/:id')
    .patch(usersController.unfollow)

//logout and clear cookie
router.route('/logout')
    .post(usersController.logout)

module.exports = router