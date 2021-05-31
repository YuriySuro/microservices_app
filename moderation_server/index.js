const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {

})

const PORT = process.env.PORT || 4001;

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('> Ready on port ' + PORT);
});