import express from 'express';
import { Request, Response, NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/db';
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = express.Router();

// Signup Route
userRouter.post('/signup', async (req, res) : Promise<any> => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide your name, email and password' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user exists in the database
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];

    // If user exists tell the user to login
    if (user) {
      return res.status(404).json({ error: 'User exists. Proceed to Login' });
    }

    // Insert into users table
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login Route
userRouter.post('/login', async (req, res): Promise<any> => {
  const { email, password } = req.body;

  // Validate input
  if (!email|| !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    // Fetch user from database
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    // If user does not exist
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '30d'
    });

    await db.query('UPDATE users SET refreshToken = ? WHERE id = ?', [refreshToken, user.id]);

    // Return success message with token
    res.status(200).json({ message: 'Login successful', token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Controller function for '/me' route
userRouter.get('/me', verifyToken, async (req, res): Promise<any> => {
  try {
    const userId = (req as Request & { userId: number }).userId;
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, name, email FROM users WHERE id = ?',
      [userId]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// refresh token route
userRouter.post('/refresh-token', async(req, res): Promise<any> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: number };

    // Optionally, check if the refresh token is stored in the database for this user
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ? AND refreshToken = ?',
      [decoded.userId, refreshToken]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Generate a new JWT token (short expiry)
    const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Return the new JWT token to the client
    res.status(200).json({ token: newToken });

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});




export default userRouter;
