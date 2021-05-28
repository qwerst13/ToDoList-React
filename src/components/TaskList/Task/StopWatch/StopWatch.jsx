import React from 'react';

import './StopWatch.scss'

export default class StopWatch extends React.Component {
  state = {

  }

  onPlay = () => {
    console.log('play');
  }

  onPause = () => {
    console.log('pause');
  }

  render() {
    return (
      <div className="timer">
        <div className="timer__play">
          <button type="button" onClick={this.onPlay} className="icon icon-play">Play</button>
        </div>
        <div className="timer__pause">
          <button type="button" onClick={this.onPause} className="icon icon-pause">Pause</button>
        </div>
        <div className="timer__time">12:25</div>
      </div>
    );
  }
}
