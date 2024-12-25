import React from 'react';
import '../styles/AnswerMessage.css';

export function AnswerMessage({ answer }) {
  return (
    <div className="answer-message">
      <h2 className="answer-title">
        {answer 
          ? "🎅 Ho Ho Ho! That's wonderful!" 
          : "🎅 There's still time to make it to the nice list!"}
      </h2>
    </div>
  );
}