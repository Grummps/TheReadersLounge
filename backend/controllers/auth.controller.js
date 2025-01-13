import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config'

const signin = async (req, res) => {
  try {
    // Find user by username
    let user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status('401').json({
        error: 'User not found',
      })
    }

    // Check password
    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Username and password don't match.",
      })
    }

    // Sign JWT
    const token = jwt.sign({ _id: user._id }, config.jwtSecret)

    // Set cookie
    res.cookie('t', token, { expire: new Date() + 9999 })

    // Return response with user info
    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
      },
    })
  } catch (err) {
    return res.status('401').json({
      error: 'Could not sign in',
    })
  }
}

const signout = (req, res) => {
  res.clearCookie('t')
  return res.status('200').json({
    message: 'signed out',
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!authorized) {
    return res.status('403').json({
      error: 'User is not authorized',
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
}
