import User from '../models/user'
import bcrypt from 'bcrypt'
import token from '../services/token'

export default {
  /* <Este función esta definida en la carpeta rutas>
  addUser: async (req, res, next) => {
    try {
      const body = req.body
      body.password = await bcrypt.hashSync(body.password, 10)
      const user = await User.create(body)
      res.status(200).send({
        user
      })
    } catch (err) {
      res.status(500).send({
        message: `An error occurred ${err}`
      })
      next(err)
    };
  },
  </Este función esta definida en la carpeta rutas> */ 
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
        .populate('list')
        .populate([
          {
            path:'list',
            populate: {path: 'tutorialVideo'}
          }
        ])
      res.status(200).send({
        ok: true,
        users
      })
    } catch (err) {
      res.status(500).send({
        message: 'An error occurred'
      })
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const userId = await User.findById(id)
      .populate('list')
      if (!userId) {
        res.status(404).send({
          message: 'There is no user'
        })
      } else {
        res.status(200).json(userId)
      }
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const update = req.body
      const user = await User.findByIdAndUpdate(id, update, { new: true })
      .populate('list')
      res.status(200).json(user)
    } catch (err) {
      res.status(500).send({
        message: 'An error ocurred'
      })
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findByIdAndDelete(id)
      res.status(200).json({ ok: true, message: 'user deleted with succefull' })
    } catch (err) {
      res.status(500).send({
        message: `An error ocurred ${err}`
      })
      next(err)
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
          const tokenReturn = await token.encode(user._id)
          res.status(200).json({ user, tokenReturn })
        } else {
          res.status(404).send({
            message: 'Incorrect Password'
          })
        }
      } else {
        res.status(404).send({
          message: 'There is no student'
        })
      }
    } catch (err) {
      res.status(500).send({
        message: 'An ocurred error'
      })
      next(err)
    }
  }
}
