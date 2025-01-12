import css from './Options.module.css'

const Options = ({ options, onLeaveFeedback, onReset, totalFeedback }) => {
  return (
    <div className={css.options}>
      {options.map(option => (
        <button
          key={option}
          onClick={() => onLeaveFeedback(option)}
          type="button"
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      {totalFeedback > 0 && (
        <button type="button" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  )
}
export default Options