import { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    } 

    return (
        <form>
            <div className="form-group">
                <div className="row">
                    <label htmlFor="staticTitle" className="col-md-6 col-lg-6 col-sm-6 text-left" style={{fontSize:"20px"}}>Title</label>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="staticTitle"
                            value={title}
                            onChange={e=>setTitle(e.target.value)}  
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-3">
                    <button onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
}

export default PostCreate;