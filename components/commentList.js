const CommentsList = ({ comments }) => {
    
    return (
       <ul>
        { comments && comments.map(c => {
            return (
                <li key={c.id}>
                    <p className="card-text">{c.content}</p>
                </li>
            );
        }) }
       </ul>
    );
}

export default CommentsList;