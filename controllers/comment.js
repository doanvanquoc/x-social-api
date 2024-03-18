import commentService from '../services/comment.js';

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
}

export default {
  createComment
}