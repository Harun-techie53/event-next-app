import { useRef, useState } from 'react';
import classes from './new-comment.module.css';

function NewComment({ sendCommentHandler }) {
  const [inputValues, setInputValues] = useState({
    email: '',
    name: '',
    comment: ''
  });

  const {email, name, comment} = inputValues;

  const onInputChangeHandler = (e) => {
    setInputValues({
        ...inputValues,
        [e.target.id]: e.target.value
    });
  }

//   const sendCommentHandler = (e) => {
//     e.preventDefault();
//     console.log(inputValues);
//   }
const onCommentFormSubmitHandler = (event) => {
    event.preventDefault();
    
    sendCommentHandler(inputValues);
  }
  return (
    <div>
        <form className={classes.form} onSubmit={onCommentFormSubmitHandler}>
        <div className={classes.row}>
            <div className={classes.control}>
                <label htmlFor='email'>Your email</label>
                <input 
                    type='email' 
                    id='email'
                    value={email}
                    onChange={onInputChangeHandler} 
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='name'>Your name</label>
                <input 
                    type='text' 
                    id='name' 
                    value={name}
                    onChange={onInputChangeHandler} 
                />
            </div>
        </div>
        <div className={classes.control}>
            <label htmlFor='comment'>Your comment</label>
            <textarea 
                id='comment' 
                rows='5' 
                value={comment}
                onChange={onInputChangeHandler} 
            />
        </div>
        {/* {isInvalid && <p>Please enter a valid email address and comment!</p>} */}
        <button type='submit'>Submit</button>
        </form>
    </div>
  );
}

export default NewComment;