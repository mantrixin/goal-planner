import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';

export const register = async (req, res, next) => {
  try {
    const { title = '', email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    if (await User.findOne({ email })) return res.status(409).json({ error: 'Email already in use' });

    const user = await User.create({ title, email, passwordHash: await bcrypt.hash(password, 10) });
    const token = signToken(user);

    res.status(201).json({ data: { user, token } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user);
    res.json({ data: { user, token } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

