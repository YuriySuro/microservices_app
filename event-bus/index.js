const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', asyncHandler(async (req, res) => {
    const event = req.body;
    
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:5000/events', event);
    await axios.post('http://localhost:8000/events', event);

}));

const PORT = process.env.PORT || 7000;

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('> Ready on port ' + PORT);
});