import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: import.meta.env.VITE_MYSQL_HOST || 'localhost',
  user: import.meta.env.VITE_MYSQL_USER || 'root123',
  password: import.meta.env.VITE_MYSQL_PASSWORD || 'your_password',
  database: import.meta.env.VITE_MYSQL_DATABASE || 'plantcare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function transaction<T>(callback: (connection: mysql.Connection) => Promise<T>): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}