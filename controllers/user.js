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

const getUserFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const followings = await userService.getUserFollowing(id);
    res.json(followings);
  } catch (error) {
    res.json(error);
  }
}

const unFollowUser = async (req, res) => {
  try {
    const { following_id } = req.body;
    const follow = await userService.unFollowUser(req.user.data.id, following_id);
    res.json(follow);
  } catch (error) {
    res.json(error);
  }
}

const updateSocketId = async (id, socketid) => {
  try {
    const user = await userService.updateSocketId(id, socketid);
    return user
  } catch (error) {
   console.log(error);
  }
}

export default {
  getUser,
  getUserFollower,
  followUser,
  getUserFollowing,
  unFollowUser,
  updateSocketId
}