import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {
  const setText = (percentage) => {
    let level1 = "Thank you for taking time...";
    let level2 = "We appreciate your time...";
    let level3 = "Half way there...";
    let level4 = "Almost there...";
    let level5 = "It is the very last section...";
    let level6 = "Done!";

    if (percentage < 20) return level1;
    if (percentage >= 20 && percentage < 40) return level2;
    if (percentage >= 40 && percentage < 60) return level3;
    if (percentage >= 60 && percentage < 80) return level4;
    if (percentage >= 80 && percentage < 100) return level5;
    if (percentage === 100) return level6;
    else return level1;
  };

  const { active, all, type } = props;
  const percentage = (active / all) * 100;
  return (
    <div className={`progress-container stick`}>
      <div className="inner-row">
        {type === "one-page" && (
          <div className="text-container">
            <p className="txt">{setText(percentage)}</p>
            <p className="progress-text"></p>
          </div>
        )}
        {type === "screen" && (
          <div className="text-container">
            <p className="txt">{setText(percentage)}</p>
            <p className="progress-text">
              {active}/<small>{all}</small>
            </p>
          </div>
        )}

        <div className="progress-bar">
          <div
            className="active-progress"
            style={{ width: `${percentage}%` }}
          ></div>
          <div className="fixed-bg"></div>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
