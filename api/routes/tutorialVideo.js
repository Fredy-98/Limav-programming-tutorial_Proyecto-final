import express from 'express'
import tutorialVideoController from '../controllers/tutorialVideoController'
import auth from '../middlewares/auth';

const router = express.Router()

// router.post('/tutorial', /* auth.verifyAdmin, */tutorialVideoController.addTutorial)
router.get('/tutorials', auth.verifyAdmin,tutorialVideoController.getTutorials)
router.get('/tutorial/:id', auth.verifyAdmin,tutorialVideoController.getTutorial)
router.delete('/tutorial/:id', auth.verifyAdmin,tutorialVideoController.deleteTutorial)
router.put('/tutorial/:id', auth.verifyAdmin,tutorialVideoController.updateTutorial)

export default router
