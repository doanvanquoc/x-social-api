const db = require('../models');
const io = require('../index');

//create a new chat room between two users, using socket.io to emit chat message
const newChat = (sender_id, receiver_id, content) => new Promise((resolve, reject) => {
  db.Chat.create({
    sender_id,
    receiver_id,
    message: content
  }).then(message => {
    db.Chat.findOne({
      where: {
        id: message.id
      },
      attributes: {exclude: ['sender_id', 'receiver_id']},
      include: [
        {
          model: db.User,
          as: 'sender',
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: {exclude: ['password', 'user_id', 'id']}
            }
          ]
        },
        {
          model: db.User,
          as: 'receiver',
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: {exclude: ['password', 'user_id', 'id']}
            }
          ]
        }
      ]
    }).then(message => {
      resolve({ success: true, message });
    }).catch(err => {
      reject({ success: false, message: err.message });
    });
  }).catch(err => {
    reject({ success: false, message: err.message });
  });
});

const getAllMessages = (sender_id, receiver_id) => new Promise((resolve, reject) => {
  db.Chat.findAll({
    //where sender_id = sender_id and receiver_id = receiver_id or sender_id = receiver_id and receiver_id = sender_id
    where: {
      [db.Sequelize.Op.or]: [
        {
          sender_id,
          receiver_id
        },
        {
          sender_id: receiver_id,
          receiver_id: sender_id
        }
      ]
    },
    attributes: {exclude: ['sender_id', 'receiver_id']},
    include: [
      {
        model: db.User,
        as: 'sender',
        include: [
          {
            model: db.Account,
            as: 'account',
            attributes: {exclude: ['password', 'user_id', 'id']}
          }
        ]
      },
      {
        model: db.User,
        as: 'receiver',
        include: [
          {
            model: db.Account,
            as: 'account',
            attributes: {exclude: ['password', 'user_id', 'id']}
          }
        ]
      }
    
    ]
  }).then(messages => {
    resolve({ success: true, messages });
  }).catch(err => {
    reject({ success: false, message: err.message });
  });
});

export default {
  newChat,
  getAllMessages
}
