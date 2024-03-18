const db = require('../models')

const getUser = (id) => new Promise(async (resolve, reject) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      include: [
        {
          model: db.Account,
          as: 'account',
          attributes: { exclude: ['password', 'user_id', 'id'] }
        }
      ]
    })
    if (!user) {
      resolve({ success: false, message: 'User not found' })
    }
    else {
      resolve({ success: true, data: user })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  getUser
}