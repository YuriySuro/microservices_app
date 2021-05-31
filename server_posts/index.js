const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

const server = express();
server.use(bodyParser.json());
server.use(cors());

const posts = {};

server.get('/posts', (req, res) => {
    res.send(posts);
});

server.post('/posts', asyncHandler(async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    
    if(title) {
        posts[id] = {
            id, title
        };
        res.status(201).send(posts[id]);
    }
    await axios.post('http://localhost:7000/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });
    
    res.writeHead(404, {'Content-Type':'application/json'});
    res.end({message:'Post not Found'});
}));

server.post('/events', (req, res) => {
    console.log('Received event:', req.body.type);
    res.send({message: 'Send event'});  
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, (err) => {
    if(err) throw err;
    console.log('> Ready on port ' + PORT);
});