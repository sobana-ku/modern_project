'use client';
import { dbConnect } from '../../lib/dbConnect';
import User from '../../schemas/User';

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
