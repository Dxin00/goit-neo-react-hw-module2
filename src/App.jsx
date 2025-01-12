import { useState, useEffect } from 'react'
import Description from './components/Description/Description'
import Feedback from './components/Feedback/Feedback'
import Options from './components/Options/Options'
import Notification from './components/Notification/Notification'
import './App.css'

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback')
    return savedFeedback ? JSON.parse(savedFeedback) : {
      good: 0,
      neutral: 0,
      bad: 0
    }
  })

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback))
  }, [feedback])

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad
  const positivePercentage = Math.round((feedback.good / totalFeedback) * 100)

  const onLeaveFeedback = (option) => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }))
  }

  const onReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }

  return (
    <div className="container">
      <Description />
      
      <Options 
        options={Object.keys(feedback)} 
        onLeaveFeedback={onLeaveFeedback}
        onReset={onReset}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback 
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback yet" />
      )}
    </div>
  )
}

export default App
