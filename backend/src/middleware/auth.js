import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    req.user = { _id: user._id, email: user.email, title: user.title };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

