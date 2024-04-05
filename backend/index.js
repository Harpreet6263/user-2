const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true 
}));

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'whatsapp'
});

const fetchMessageData = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM chat`;
        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

app.get('/messagedata', async (req, res) => {
    try {
        const messageData = await fetchMessageData();
        res.json(messageData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/sendMessage', (req, res) => {
    const { messageEntered } = req.body; 
    const sql = `INSERT INTO chat (msg, sender) VALUES (? , 'Harpreet')`;
    pool.query(sql, [messageEntered], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      console.log('Data inserted successfully');
      res.json({ message: 'Data received and stored successfully' });
    });
  }); 

const PORT = 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
