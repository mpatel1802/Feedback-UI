import React from 'react'
import FeedbackContext from '../context/FeedbackContext';
import { useContext } from 'react';

function FeedbackStats() {

  const { feedback } = useContext(FeedbackContext);    
    let calcAverage = feedback.reduce((acc, curr) => { return acc + curr.rating }, 0) / feedback.length;
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(calcAverage) ? 0 : calcAverage.toFixed(1)}</h4>
    </div>
  );
}

export default FeedbackStats