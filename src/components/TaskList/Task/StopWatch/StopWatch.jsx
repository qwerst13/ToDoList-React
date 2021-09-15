import React from 'react';
import { format } from 'date-fns';

import './StopWatch.scss';

export default class StopWatch extends React.Component {
  state = {
    time: 0,
    timeSaved: 0,
    timeStamp: 0,
    isRun: false,
  };

  onPlay = () => {
    const { isRun } = this.state;

    if (isRun) return;

    this.setState({ timeStamp: Date.now(), isRun: true });
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  onPause = () => {
    const { time } = this.state;

    this.setState({ timeSaved: time, isRun: false });
    clearInterval(this.timerID);
  };

  tick = () => {
    const { timeStamp, timeSaved } = this.state;
    const timeDiff = Date.now() - timeStamp;

    this.setState({ time: timeDiff + timeSaved });
  };

  render() {
    const { time } = this.state;
    const timeFormatted = format(time, 'mm:ss');

    return (
      <div className="timer">
        <div className="timer__play">
          <button type="button" onClick={this.onPlay} className="icon icon-play">
            Play
          </button>
        </div>
        <div className="timer__pause">
          <button type="button" onClick={this.onPause} className="icon icon-pause">
            Pause
          </button>
        </div>
        <div className="timer__time">{timeFormatted}</div>
      </div>
    );
  }
}
