// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {initialCount: 25, isClicked: false, inSecs: 0}
  }

  resetApp = () => {
    this.clearTimeInterval()
    this.setState({initialCount: 25, isClicked: false, inSecs: 0})
  }

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  changeStartPlayImage = () => {
    const {isClicked, initialCount, inSecs} = this.state
    const isStopped = inSecs === initialCount * 60

    if (isClicked) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(() => {
        if (isStopped) {
          this.setState({inSecs: 0, isClicked: false})
          this.clearTimeInterval()
        } else {
          this.setState(prevState => ({inSecs: prevState.inSecs + 1}))
        }
      }, 1000)
    }
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  decreaseValue = () => {
    this.setState(prevState => ({initialCount: prevState.initialCount - 1}))
  }

  increaseValue = () => {
    this.setState(prevState => ({initialCount: prevState.initialCount + 1}))
  }

  renderTimerCalculationResult = () => {
    const {initialCount, inSecs} = this.state

    const remainingSecs = initialCount * 60 - inSecs

    const minutes = Math.floor(remainingSecs / 60)
    const seconds = Math.floor(remainingSecs % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {initialCount, isClicked, inSecs} = this.state
    const disabled = inSecs > 0
    const url = !isClicked
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
    const altValue = !isClicked ? 'play icon' : 'pause icon'
    const status = !isClicked ? 'Start' : 'Pause'
    const isActive = !isClicked ? 'Paused' : 'Running'

    return (
      <div className="main-bg">
        <h1 className="main-head">Digital Timer</h1>
        <div className="central-bg">
          <div className="bg">
            <div className="timer-container">
              <h1 className="count-down">
                {this.renderTimerCalculationResult()}
              </h1>
              <p className="condition">{isActive}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="start-pause-reset">
              <div className="start-pause">
                <button type="button" onClick={this.changeStartPlayImage}>
                  <img
                    className="start-pause-reset-image"
                    src={url}
                    alt={altValue}
                  />
                </button>
                <p className="text">{status}</p>
              </div>
              <div className="reset-container">
                <button type="button" onClick={this.resetApp}>
                  <img
                    className="start-pause-reset-image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                  />
                </button>
                <p className="text">Reset</p>
              </div>
            </div>
            <p className="timer-head">Set Timer Limit</p>
            <div className="timer-buttons-container">
              <button
                type="button"
                onClick={this.decreaseValue}
                disabled={disabled}
              >
                -
              </button>
              <div className="value-container">{initialCount}</div>
              <button
                type="button"
                onClick={this.increaseValue}
                disabled={disabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
