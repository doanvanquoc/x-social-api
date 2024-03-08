import db from '../models'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const login = (email, password) => new Promise(async (resolve, reject) => {
  try {
    const user = await db.Account.findOne({
      where: { email, password },
      include: 'user',
      attributes: { exclude: ['password', 'user_id'] }
    })
    if (!user) {
      reject({ success: false, message: 'Email or password is incorrect' })
    }
    else {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' })
      resolve({ success: true, token: token })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const register = (email, password, username, display_name, bio) => new Promise(async (resolve, reject) => {
  try {
    const check = await db.Account.findOne({ where: { email } })
    if (check) {
      return reject({ success: false, message: 'Email already exists' })
    }
    const checkUsername = await db.User.findOne({ where: { username } })
    if (checkUsername) {
      return reject({ success: false, message: 'Username already exists' })
    }
    const user = await db.User.create({ username, display_name, bio})
    await db.Account.create({ email, password, user_id: user.id })
    const payload = await db.Account.findOne({
      where: { email },
      include: 'user',
      attributes: { exclude: ['password', 'user_id'] }
    })
    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
    resolve({ success: true, token})
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default { login, register }