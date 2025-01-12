import { useState, useEffect } from 'react'
import './Options.css'

const Options = ({ options, onLeaveFeedback, onReset, totalFeedback }) => {
  const [lastClicked, setLastClicked] = useState(null)

  useEffect(() => {
    if (lastClicked) {
      const timer = setTimeout(() => {
        setLastClicked(null)
      }, 250) // уменьшили с 500мс до 250мс (в два раза быстрее)

      return () => clearTimeout(timer)
    }
  }, [lastClicked])

  const handleClick = (option) => {
    setLastClicked(option)
    onLeaveFeedback(option)
  }

  return (
    <div className="feedback-section">
      {options.map(option => (
        <button
          key={option}
          className={`feedback-type-button ${lastClicked === option ? `${option}-active` : ''}`}
          onClick={() => handleClick(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      {totalFeedback > 0 && (
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  )
}

export default Options