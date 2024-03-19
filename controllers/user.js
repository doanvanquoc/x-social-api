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

export default {
  getUser,
  getUserFollower
}