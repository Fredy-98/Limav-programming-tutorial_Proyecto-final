import express from 'express'
import userController from '../controllers/userController'
import auth from '../middlewares/auth';

const router = express.Router() 

// router.post('/user', auth.verifyAdmin,userController.addUser)
router.get('/users', auth.verifyAdmin,userController.getUsers)
router.get('/user/:id', auth.verifyAdmin,userController.getUser)
router.delete('/user/:id', auth.verifyAdmin,userController.deleteUser)
router.put('/user/:id', auth.verifyAdmin,userController.updateUser)
router.post('/login', userController.login)

export default router
