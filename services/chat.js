const db = require('../models');
const io = require('../index');

//create a new chat room between two users, using socket.io to emit chat message
const newChat = (sender_id, receiver_id, content, image) => new Promise((resolve, reject) => {
  db.Chat.create({
    sender_id,
    receiver_id,
    message: content,
    image
  }).then(message => {
    db.Chat.findOne({
      where: {
        id: message.id
      },
      attributes: { exclude: ['sender_id', 'receiver_id'] },
      include: [
        {
          model: db.User,
          as: 'sender',
          include: [
            {
              model: db.Account,
              as: 'account',
              attributes: { exclude: ['password', 'user_id', 'id'] }
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
              attributes: { exclude: ['password', 'user_id', 'id'] }
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
    attributes: { exclude: ['sender_id', 'receiver_id'] },
    include: [
      {
        model: db.User,
        as: 'sender',
        include: [
          {
            model: db.Account,
            as: 'account',
            attributes: { exclude: ['password', 'user_id', 'id'] }
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
            attributes: { exclude: ['password', 'user_id', 'id'] }
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

const getUserChatRoom = (userId) => new Promise(async (resolve, reject) => {
  try {
    // Thực hiện truy vấn để lấy danh sách tất cả các người dùng mà người dùng có ID là userId đã trò chuyện với
    const users = await db.User.findAll({
      include: [
        {
          model: db.Chat,
          as: 'sender',
          where: {
            [db.Sequelize.Op.or]: [
              { sender_id: userId },
              { receiver_id: userId }
            ]
          },
          attributes: []
        },
        {
          model: db.Account,
          as: 'account',
          attributes: { exclude: ['password', 'user_id', 'id'] }
        }
      ],
      where: {
        id: {
          [db.Sequelize.Op.ne]: userId // Loại bỏ người dùng đang đăng nhập khỏi kết quả trả về
        }
      },
      group: ['User.id', 'account.email'],
      raw: true
    });

    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.avatar,
      bio: user.bio,
      account: {
        email: user['account.email']
      }
    }));

    resolve({ success: true, users: formattedUsers });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});


export default {
  newChat,
  getAllMessages,
  getUserChatRoom
}
