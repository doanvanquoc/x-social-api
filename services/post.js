const db = require('../models')

const getAllPosts = () => new Promise(async (resolve, reject) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'username', 'display_name', 'avatar']
        },
        {
          model: db.Image,
          as: 'images',
          attributes: ['id', 'path']
        }
      ],
    })
    resolve({ success: true, data: posts })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const getPostById = (id) => new Promise(async (resolve, reject) => {
  try {
    const post = await db.Post.findOne({ where: { id } })
    resolve({ success: true, data: post })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  getAllPosts,
  getPostById
}