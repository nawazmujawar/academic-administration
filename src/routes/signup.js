const express = require('express');
const router = express();

//Middlewares
const authCheck = require('../middlewares/authCheck');

//Controllers
const signUpController = require('../controllers/signup');


//Homepage
router.get('/teacher', authCheck.redirectToDashboardTeacher, signUpController.getTeacherSignUp);

router.post('/teacher', signUpController.postTeacherSignUp);

//Student signin
router.get('/student', authCheck.redirectToFeedStudent, signUpController.getStudentSignIn);

router.post('/student', signUpController.postStudentSignUp);


module.exports = router;