import React, { useContext, useEffect } from 'react'
import Card from './shared/Card';
import { useState } from 'react';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState("");
  const { handleAdd, feedbackEdit, handleUpdate } = useContext(FeedbackContext);
  // Done first when the component is mounted first.
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      setBtnDisabled(false);
    }

  }, [feedbackEdit] /* Dependency array -  It contains the values that change when an event occurs*/)
    const handleTextChange = (e) => {

        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Feedback must be atleast 10 characters');
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(e.target.value);
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating: rating
      }

      if (feedbackEdit.edit === true) {
        handleUpdate(feedbackEdit.item.id, newFeedback);
      } else {
        handleAdd(newFeedback);
      }
      setText("");
    }
  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
              <h2>Please rate us with your feedback.</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                  <input onChange={handleTextChange} value={ text } type="text" placeholder="Write a review" />
          <Button type="submit" isDisabled={btnDisabled}>Submit</Button>
            </div>

              {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm