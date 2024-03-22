const db = require('../models')

const getAllGroups = () => new Promise(async (resolve, reject) => {
  try {
    const groups = await db.Group.findAll({
      include: [
        {
          model: db.User,
          as: 'creator',
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: { exclude: ['password', 'user_id', 'id'] }
            },
          ]
        },
        {
          model: db.Membership,
          as: 'members',
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
        }
      ],
    })
    resolve({ success: true, data: groups })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  getAllGroups
}