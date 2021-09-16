import * as React from 'react';
import { format } from 'date-fns';

import './StopWatch.scss';

const { useState, useEffect } = React;
export function StopWatch() {
  const [time, setTime] = useState<number>(0);
  // const [timeSaved, setTimeSaved] = useState<number>(0);
  // const [timeStamp, setTimeStamp] = useState<number>(0);
  const [isRun, setIsRun] = useState<boolean>(false);

  useEffect(() => {
    if (!isRun) return;

    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  }, [time, isRun]);

  function tick() {
    setTime((prevTime) => prevTime + 1000);
  }

  function toggle() {
    setIsRun((prevIsRun) => !prevIsRun);
  }

  const timeFormatted = format(time, 'mm:ss');

  return (
    <div className="timer">
      <div className="timer__play">
        <button type="button" onClick={toggle} className="icon icon-play">
          Play
        </button>
      </div>
      <div className="timer__pause">
        <button type="button" onClick={toggle} className="icon icon-pause">
          Pause
        </button>
      </div>
      <div className="timer__time">{timeFormatted}</div>
    </div>
  );
}
