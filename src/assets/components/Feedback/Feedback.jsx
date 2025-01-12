import css from './Feedback.module.css'

const Feedback = ({ feedback, total, positivePercentage }) => {
  return (
    <div className={css.feedback}>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {total}</p>
      <p>Positive: {positivePercentage}%</p>
    </div>
  )
}

export default Feedback
