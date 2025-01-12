import { useState, useEffect } from 'react'
import './Opinion.css'
import { FaRegThumbsUp, FaRegMeh, FaRegThumbsDown } from 'react-icons/fa'
import Description from './Description/Description'

const Opinion = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const [lastClicked, setLastClicked] = useState(null)
  const [badPosition, setBadPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (lastClicked) {
      const timer = setTimeout(() => {
        setLastClicked(null)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [lastClicked])

  const handleFeedback = (type) => {
    setFeedback(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))
    setLastClicked(type)
  }

  const handleReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad

  const handleBadButtonHover = (e) => {
    const button = e.target.closest('button');
    const rect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const directionX = mouseX > buttonCenterX ? -1 : 1;
    const directionY = mouseY > buttonCenterY ? -1 : 1;
    
    const randomX = directionX * (Math.random() * 200 + 100);
    const randomY = directionY * (Math.random() * 150 + 50);
    
    setBadPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="container">
      <Description />
      
      <div className="feedback-section">
        <button 
          className={`feedback-type-button ${lastClicked === 'good' ? 'good-active' : ''}`}
          onClick={() => handleFeedback('good')}
        >
          <FaRegThumbsUp className="feedback-icon" />
          <h3>Good</h3>
        </button>
        <button 
          className={`feedback-type-button ${lastClicked === 'neutral' ? 'neutral-active' : ''}`}
          onClick={() => handleFeedback('neutral')}
        >
          <FaRegMeh className="feedback-icon" />
          <h3>Neutral</h3>
        </button>
        <button 
          className={`feedback-type-button ${lastClicked === 'bad' ? 'bad-active' : ''}`}
          onClick={() => handleFeedback('bad')}
          onMouseEnter={handleBadButtonHover}
          style={{
            transform: `translate(${badPosition.x}px, ${badPosition.y}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <FaRegThumbsDown className="feedback-icon" />
          <h3>Bad</h3>
        </button>
      </div>

      <div className="feedback-values">
        <span className="feedback-value">{feedback.good}</span>
        <span className="feedback-value">{feedback.neutral}</span>
        <span className="feedback-value">{feedback.bad}</span>
      </div>
      
      <div className="feedback-summary">
        {totalFeedback > 0 ? (
          <div className="feedback-stats">
            <p>Total feedback: {totalFeedback}</p>
            <p>Positive feedback: {Math.round((feedback.good / totalFeedback) * 100)}%</p>
            <button 
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : (
          <p className="no-feedback">No feedback yet</p>
        )}
      </div>
    </div>
  )
}

export default Opinion
