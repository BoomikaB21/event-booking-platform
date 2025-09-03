import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ user, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};









