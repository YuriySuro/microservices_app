import { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
            content
        });

        setContent('');
    }

    return (
        <div>
            <form >
                <div className="form-group">
                    <label htmlFor="staticComment">New Comment</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="staticComment"
                        value={content}
                        onChange={e=>setContent(e.target.value)}
                     />
                </div>
                <button onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate;