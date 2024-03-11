const jwt = require('jsonwebtoken');
import dotenv from 'dotenv'
dotenv.config()


function verifyToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Access denied. Authorization header is missing.' });
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access denied. Invalid token.' });
  }
}
module.exports = verifyToken;
