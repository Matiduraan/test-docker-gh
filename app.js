require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send("OK");
});

// Endpoint para obtener ubicaciones
app.get('/locations', async (req, res) => {
  try {
    const { rows: locations } = await pool.query('SELECT * FROM location');
    return res.json(locations);
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

app.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
});
