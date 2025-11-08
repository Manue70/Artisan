import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'art_exo',
  password: 'Artisan123',
  database: 'artisans_db',
  port: 3306
});

export default db;

