import authService from '../services/auth';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const register = async (req, res) => {
  try {
    const { email, password, username, display_name, bio } = req.body;
    if (!email || !password || !username || !display_name || !bio) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const result = await authService.register(email, password, username, display_name, bio);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {login, register}
