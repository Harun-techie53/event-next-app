import classes from './comment-list.module.css';

function CommentList({ comment }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>{comment.comment}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;