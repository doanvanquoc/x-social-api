import userService from '../services/user';

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.json(user);
  } catch (error) {
    res.json(error)
  }
}

const getUserFollower = async (req, res) => {
  try {
    const { id } = req.params;
    const followers = await userService.getUserFollower(id);
    res.json(followers);
  } catch (error) {
    res.json(error);
  }
}

const followUser = async (req, res) => {
  try {
    const { following_id } = req.body;
    const follow = await userService.followUser(req.user.data.id, following_id);
    res.json(follow);
  } catch (error) {
    res.json(error);
  }
}

export default {
  getUser,
  getUserFollower,
  followUser
}