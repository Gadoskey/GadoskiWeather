// MySQL Connection 
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';


dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export interface User {
  id: string;
  email: string;
  name: string;
}

// Fetch user by userId
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, email, name FROM users WHERE id = ?',
      [userId]
    );

    // Cast the first row to a User
    const user = rows[0] as User;

    // Return the user if found, or null if not
    return user || null;
  } catch (err) {
    throw new Error('Error fetching user');
  }
};