const express = require('express');
const router = express.Router();

//Homepage
router.get('/', (req, res, next) => {
    try {
        return res.status(200).render('home');
    } catch (error) {
        console.error(error);
    }
});

//Pull data from server


module.exports = router;