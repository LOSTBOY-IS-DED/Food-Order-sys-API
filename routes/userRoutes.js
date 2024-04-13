const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router()


//routes 
//GEt user || get 
router.get('/getUser',authMiddleware, getUserController);

//UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController);


module.exports = router ;