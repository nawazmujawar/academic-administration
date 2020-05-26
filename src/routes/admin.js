const express = require('express');
const router = express.Router();

//Middlwares
const authCheck = require('../middlewares/authCheck');

const adminController = require('../controllers/admin');

//Load dashboard
router.get('/dashboard', authCheck.redirectToSignInAdmin, adminController.getAdminDashboard);

//API for blocking or unblocking
router.patch('/:userId/approve', adminController.approveTeacherAPI);

//API for remove teacher
router.delete('/:userId/remove', adminController.removeTeacherAPI);

//Sign out from session
router.get('/signout', authCheck.redirectToSignInAdmin, adminController.signoutAdmin);


module.exports = router;