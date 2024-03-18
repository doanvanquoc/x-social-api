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
      resolve({ success: false, message: 'Email or password is incorrect' })
    }
    else {
      const payload = await db.User.findOne({
        where: { id: user.user.id },
        include: [
          {
            model: db.Account,
            as: 'account',
            attributes: { exclude: ['password', 'user_id'] }
          }
        ],
      })
      const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
      resolve({ success: true, token: token })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const register = (email, password, username, display_name, bio, file) => new Promise(async (resolve, reject) => {
  try {
    console.log(file.path);
    const check = await db.Account.findOne({ where: { email } })
    if (check) {
      if (file) {
        cloudinary.uploader.destroy(file.filename)
      }
      resolve({ success: false, message: 'Email already exists' })
    }
    const checkUsername = await db.User.findOne({ where: { username } })
    if (checkUsername) {
      if (file) {
        cloudinary.uploader.destroy(file.filename)
      }
      return resolve({ success: false, message: 'Username already exists' })
    }
    let avatar;
    if (!file) {
      avatar = 'https://res.cloudinary.com/dvlmkceym/image/upload/v1709884630/avatar/x0yqligvo08ungdtm6db.jpg'
    }
    else {
      avatar = file.path
    }
    const user = await db.User.create({ username, display_name, bio, avatar })
    await db.Account.create({ email, password, user_id: user.id })
    const payload = await db.User.findOne({
      where: { id: user.user.id },
      include: [
        {
          model: db.Account,
          as: 'account',
          attributes: { exclude: ['password', 'user_id'] }
        }
      ],
    })
    const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
    resolve({ success: true, token })
  } catch (error) {
    if (file) {
      cloudinary.uploader.destroy(file.filename)
    }
    reject({ success: false, message: error.message })
  }
})

const checkBeforeRegister = (email) => new Promise(async (resolve, reject) => {
  try {
    const check = await db.Account.findOne({ where: { email } })
    if (check) {
      return resolve({ success: false, message: 'Email already exists' })
    }
    resolve({ success: true })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default { login, register, checkBeforeRegister }