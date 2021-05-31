const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const asyncHandler = require('express-async-handler'); 

const server = express();
server.use(bodyParser.json());
server.use(cors());

const commentsByPostId = {};

server.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    res.send(commentsByPostId[id] || []);
});

server.post('/posts/:id/comments', asyncHandler(async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id } = req.params;
    if(content) {
        const comments = commentsByPostId[id] || [];
        comments.push({ id: commentId, content });
        commentsByPostId[id] = comments; 
        res.status(201).send(comments);
    } else {
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end({message:'Comments not Found'});
    }
    await axios.post('http://localhost:7000/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id
        }
    });
}));

server.post('/events', (req, res) => {
    console.log('Received event:', req.body.type);
    res.send({ message: 'Send event'});
 });

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
    if(err) throw err;
    console.log('> Ready on port ' + PORT);
});