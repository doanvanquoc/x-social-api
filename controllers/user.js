import userService from '../services/user';

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    if (user.success) {
      return res.status(200).json({ success: true, user: user.user });
    }
    return res.status(404).json({ success: false, message: user.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default {
  getUser
}