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

const joinGroup = (groupId, userId) => new Promise(async (resolve, reject) => {
  try {
    //check if user already joined group then remove user from group else add user to group
    //check if user is creator of group, then return message that user cannot leave group
    const membership = await db.Membership.findOne({ where: { group_id: groupId, user_id: userId } })
    if (membership) {
      //check if user is creator of group
      const group = await db.Group.findOne({ where: { id: groupId } })
      if (group.creator_id === userId) {
        resolve({ success: false, message: 'You are the creator of the group' })
      } else {
        await db.Membership.destroy({ where: { group_id: groupId, user_id: userId } })
        resolve({ success: true, message: 'You have left the group' })
      }
    } else {
      await db.Membership.create({ group_id: groupId, user_id: userId })
      resolve({ success: true, message: 'You have joined the group' })
    }
    resolve({ success: true, data: membership })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const getGroupById = (groupId) => new Promise(async (resolve, reject) => {
  try {
    const group
      = await db.Group.findOne({
        where: { id: groupId },
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
    if (!group) {
      resolve({ success: false, message: 'Group not found' })
    }
    else {
      resolve({ success: true, data: group })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

export default {
  getAllGroups,
  joinGroup,
  getGroupById
}