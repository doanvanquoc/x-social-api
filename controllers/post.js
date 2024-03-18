import postService from '../services/post';

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllPosts,
  getPostById
}