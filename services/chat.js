const db = require('../models');
const io = require('../index');

//create a new chat room between two users, using socket.io to emit chat message
const newChat = (sender_id, receiver_id, content) => new Promise((resolve, reject) => {
  //emit chat message to receiver and sender
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  db.Chat.create({
    sender_id,
    receiver_id,
    content
  }).then(chat => {
    resolve({ success: true, chat });
  }).catch(err => {
    reject({ success: false, message: err.message });
  });
});

const getAllMessages = (sender_id, receiver_id) => new Promise((resolve, reject) => {
  db.Chat.findAll({
    where: {
      sender_id,
      receiver_id
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
