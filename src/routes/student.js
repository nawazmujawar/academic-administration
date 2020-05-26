const express = require('express');
const router = express.Router();

//Controllers
const studentController = require('../controllers/student');

//Middlwares
const authCheck = require('../middlewares/authCheck');

//Get feed
router.get('/feed', authCheck.redirectToSignInStudent, studentController.getFeed);

//View single post
router.get('/feed/post/:postId', authCheck.redirectToSignInStudent, studentController.getSinglePost);

//Sign out from session
router.get('/signout', authCheck.redirectToSignInStudent, studentController.getSignOut);

module.exports = router;