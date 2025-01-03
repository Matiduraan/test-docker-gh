require('dotenv').config();
const express = require('express');
const { createPool } = require('mysql2/promise');

const sql = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
	return res.send("OK");
});

app.get('/locations', async(req, res) => {
  try {
      const [locations] = await sql.query('SELECT * FROM location');
      return res.json(locations);
  }
  catch(error) {
    console.log("ERROR:",error)
    return res.status(500).json({
        message: 'Internal server error',
    });
  }
});

app.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
});
