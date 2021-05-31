import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentsList from './commentList';

const PostList = ({ dataPosts }) => {
    const [posts, setPosts] = useState(dataPosts);
    
    useEffect(async () => {
        if(!dataPosts) {
            const res = await axios.get('http://localhost:8000/posts');
            setPosts(res.data);
        }
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div  
                className="card" 
                style={{width:"30%",marginBottom:"20px"}}
                key={post.id}
            >
                <div className="card-body">
                    <h3 className="card-title" >{post.title}</h3>
                    <CommentCreate postId={post.id} />
                    <hr />
                    <CommentsList comments={post.comments} />
                </div>
            </div>
        );
    });
   

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
        );
}


export default PostList;