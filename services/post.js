const cloudinary = require('cloudinary').v2;

const db = require('../models')

const getAllPosts = () => new Promise(async (resolve, reject) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'username', 'display_name', 'avatar', 'bio'],
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: { exclude: ['password', 'user_id', 'id'] }
            },
          ]
        },
        {
          model: db.Comment,
          as: 'comments',
          attributes: ['id', 'content', 'createdAt'],
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
        },
        //include count total likes
        {
          model: db.Like,
          as: 'likes',
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
    const post = await db.Post.findOne({
      where: { id },
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
        },
        {
          model: db.Comment,
          as: 'comments',
          attributes: ['id', 'content', 'createdAt'],
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
        },
        //include count total likes
        {
          model: db.Like,
          as: 'likes',
        },
        {
          model: db.Image,
          as: 'images',
          attributes: ['id', 'path']
        }
      ],
    })
    if (!post) {
      resolve({ success: false, message: 'Post not found' })
    }
    else {
      resolve({ success: true, data: post })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const createPost = (body, files) => new Promise(async (resolve, reject) => {
  try {
    const post = await db.Post.create(body)
    if (files) {
      for (const file of files) {
        await db.Image.create({ path: file.path, post_id: post.id})
      }
    }
    const newPost = await db.Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'username', 'display_name', 'avatar', 'bio'],
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: { exclude: ['password', 'user_id', 'id'] }
            }
          ]
        },
        {
          model: db.Like,
          as: 'likes',
        },
        {
          model: db.Image,
          as: 'images',
          attributes: ['id', 'path']
        }
      ],
    })
    resolve({ success: true, data: newPost })
  } catch (error) {
    if (files) {
      for (const file of files) {
        cloudinary.uploader.destroy(file.filename)
      }
    }
    reject({ success: false, message: error.message })
  }
})

const getUserPosts = (userId) => new Promise(async (resolve, reject) => {
  try {
    const posts = await db.Post.findAll({
      where: { user_id: userId },
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
        },
        {
          model: db.Comment,
          as: 'comments',
          attributes: ['id', 'content', 'createdAt'],
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
        },

        //include count total likes
        {
          model: db.Like,
          as: 'likes',
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
    reject('{ success: false, message: error.message }')
  }
})

const likePost = (userId, postId) => new Promise(async (resolve, reject) => {
  try {
    const like = await db.Like.findOne({ where: { user_id: userId, post_id: postId } })
    if (like) {
      await like.destroy()
      resolve({ success: true, message: 'Unlike post successfully' })
    }
    else {
      await db.Like.create({ user_id: userId, post_id: postId })
      resolve({ success: true, message: 'Like post successfully' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})


export default {
  getAllPosts,
  getPostById,
  createPost,
  getUserPosts,
  likePost
}