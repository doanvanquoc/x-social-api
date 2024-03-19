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

const getUserFollower = (id) => new Promise(async (resolve, reject) => {
  try {
    const followers = await db.Follow.findAll({
      where: { following_id: id },
      include: [
        {
          model: db.User,
          as: 'user',
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: { exclude: ['password', 'user_id', 'id'] }
            }
          ]
        }
      ]
    })
    resolve({ success: true, data: followers })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const followUser = (follower_id, following_id) => new Promise(async (resolve, reject) => {
  try {
    console.log(follower_id, following_id);
    const follow = await db.Follow.create({ follower_id, following_id })
    resolve({ success: true, data: follow })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  getUser,
  getUserFollower,
  followUser
}