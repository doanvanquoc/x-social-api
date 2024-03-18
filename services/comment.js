const db = require('../models')

const createComment = (body) => new Promise(async (resolve, reject) => {
  try {
    const comment = await db.Comment.create(body)
    resolve({ success: true, data: comment })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  createComment
}