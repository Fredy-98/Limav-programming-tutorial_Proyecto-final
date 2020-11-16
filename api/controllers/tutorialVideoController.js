import tutorialVideo from '../models/tutorialVideo'
// import token from '../services/token'

export default {
  addTutorial: async (req, res, next) => {
    try {
      const body = req.body
      const tutorialV = await tutorialVideo.create(body)
      res.status(200).send({
        tutorialV
      })
    } catch (err) {
      res.status(500).send({
        message: `An error occurred ${err}`
      })
      next(err)
    };
  },
  getTutorials: async (req, res, next) => {
    try {
      const tutorials = await tutorialVideo.find({})
      res.status(200).send({
        ok: true,
        tutorials
      })
    } catch (err) {
      res.status(500).send({
        message: 'An error occurred'
      })
      next(err)
    }
  },
  getTutorial: async (req, res, next) => {
    try {
      const { id } = req.params
      const tutorialId = await tutorialVideo.findById(id)
        .populate('subject')
      if (!tutorialId) {
        res.status(404).send({
          message: 'There is no user'
        })
      } else {
        res.status(200).json(tutorialId)
      }
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  updateTutorial: async (req, res, next) => {
    try {
      const { id } = req.params
      const update = req.body
      const tutorial = await tutorialVideo.findByIdAndUpdate(id, update, { new: true })
      res.status(200).json(tutorial)
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  deleteTutorial: async (req, res, next) => {
    try {
      const { id } = req.params
      await tutorialVideo.findByIdAndDelete(id)
      res.status(200).json({ ok: true, message: 'tutorialVideo deleted with succefull' })
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  }
}
