import express from 'express'
import listController from '../controllers/listController'
import auth from '../middlewares/auth';

const router = express.Router()

router.post('/list', auth.verifyAdmin,listController.addList)
router.get('/lists', auth.verifyAdmin,listController.getLists)
router.get('/list/:id', auth.verifyAdmin,listController.getList)
router.delete('/list/:id', auth.verifyAdmin,listController.deleteList)
router.put('/list/:id', auth.verifyAdmin,listController.updateList)

export default router
