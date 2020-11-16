import jwt from 'jsonwebtoken'
import User from '../models/user'

async function checkToken (token) {
  let __id = null
  try {
    const { _id } = await jwt.decode(token)
    __id = _id
  } catch (err) {
    return false
  }
  const user = await User.findOne({ _id: __id })
  if (user) {
    const token = jwt.sign({ _id: __id }, 'claveSecretaParaGenerarToken', { expiresIn: '10d' })
    return { token, rol: user.role }
  } else {
    return false
  }
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, 'claveSecretaParaGenerarToken', { expiresIn: '10d' })
    return token
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, 'claveSecretaParaGenerarToken')
      const user = await User.findOne({ _id })
      if (user) {
        return user
      } else {
        return false
      }
    } catch (err) {
      const newToken = await checkToken(token)
      return newToken
    }
  }
}
