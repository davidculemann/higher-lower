import { useEffect } from "react";

interface TimerProps {
  time: number;
  setTime: (input: number) => void;
}

export function Timer(props: TimerProps): JSX.Element {
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (props.time > 0) {
        props.setTime(props.time - 1);
      }
    }, 1000);
    return () => clearInterval(myInterval);
  });

  return (
    <h2>
      time:{" "}
      <span className={props.time > 10 ? "time" : "low-time"}>
        {props.time}
      </span>
    </h2>
  );
}
