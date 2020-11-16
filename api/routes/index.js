import express from 'express'
import userRouter from './user'
import listRouter from './list'
import tutorialVideoRouter from './tutorialVideo'
import uploadUserRouter from './uploadUser'
import uploadTutorialRouter from './uploadTutorial'

const router = express.Router()

router.use(userRouter)
router.use(listRouter)
router.use(tutorialVideoRouter)
router.use(uploadUserRouter)
router.use(uploadTutorialRouter) 

export default router
