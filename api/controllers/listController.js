import List from '../models/list'
// import token from '../services/token'

export default {
  addList: async (req, res, next) => {
    try {
      const body = req.body
      const list = await List.create(body)
      res.status(200).send({list})
    } catch (err) {
      res.status(500).send({
        message: `An error occurred ${err}`
      })
      next(err)
    };
  },
  getLists: async (req, res, next) => {
    try {
      const lists = await List.find({})
      .populate('tutorialVideo')
      res.status(200).send({
        ok: true,
        lists
      })
    } catch (err) {
      res.status(500).send({
        message: 'An error occurred'
      })
      next(err)
    }
  },
  getList: async (req, res, next) => {
    try {
      const { id } = req.params
      const listId = await List.findById(id)
      .populate('tutorialVideo')
      if (!listId) {
        res.status(404).send({
          message: 'There is no user'
        })
      } else {
        res.status(200).json(listId)
      }
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  updateList: async (req, res, next) => {
    try {
      const { id } = req.params
      const update = req.body
      const list = await List.findByIdAndUpdate(id, update, { new: true })
      res.status(200).json(list)
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  deleteList: async (req, res, next) => {
    try {
      const { id } = req.params
      await List.findByIdAndDelete(id)
      res.status(200).json({ ok: true, message: 'list deleted with succefull' })
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  }
}
