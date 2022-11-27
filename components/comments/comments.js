import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const sendCommentHandler = async (inputValues) => {
    const {name, email, comment} = inputValues;
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        name, 
        email, 
        comment,
        eventId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const res = await response.json();

    console.log(res);
  } 

  const fetchAllComments = async () => {
    try {
      const response = await fetch('/api/comment');
      const {data} = await response.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllComments();
  }, []);
  

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment sendCommentHandler={sendCommentHandler} />}
      {showComments && comments.map((comment) => ( 
        <CommentList 
          key={comment.id} 
          comment={comment}
        /> 
      ))}
    </section>
  );
}

export default Comments;