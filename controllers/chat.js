import chatService from '../services/chat.js';

const newChat = async (req, res) => {
    const { receiver_id, content } = req.body;
    console.log(content);
    try {
        const chat = await chatService.newChat(req.user.data.id, receiver_id, content);
        res.json(chat);
    } catch (error) {
        res.json(error);
    }
}

const getAllMessages = async (req, res) => {
    const {  receiver_id } = req.params;
    try {
        const messages = await chatService.getAllMessages(req.user.data.id, receiver_id);
        res.json(messages);
    } catch (error) {
        res.json(error);
    }
}

const getUserChatRoom = async (req, res) => {
    try {
        const chats = await chatService.getUserChatRoom(req.user.data.id);
        res.json(chats);
    } catch (error) {
        res.json(error);
    }
}

export default {
    newChat,
    getAllMessages,
  getUserChatRoom
}