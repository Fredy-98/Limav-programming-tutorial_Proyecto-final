import tokenServices from '../services/token'
export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      })
    }
    const response = await tokenServices.decode(req.headers.token)
    if (response.role == 'ADMIN' || response.role == 'STUDENT') {
      next()
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      })
    }
  },
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      })
    }
    const response = await tokenServices.decode(req.headers.token)
    if (response.role == 'ADMIN') {
      next()
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      })
    }
  }
}
