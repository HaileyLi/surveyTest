import "./App.css";
import SurveyContainer from "./container/SurveyContainer";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import ConsentPage from "./container/ConsentPage/ConsentPage";
import { postRequest } from "./Service/actions.js";
import InfoPage from "./container/InfoPage/InfoPage";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const App = (props) => {
  const [start, setStart] = useState(false);
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [clickArray, setClickArray] = useState({});
  const [end, setEnd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currState, setCurrState] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [randomNum, setRandomNum] = useState(0);
  const [prevTimestamp, setPrevTimestamp] = useState(Date.now());

  useScrollPosition(({ prevPos, currPos }) => {
    // let prevPosValue = prevPos.y;
    let currPosValue = currPos.y;
    let scrollLength = Math.abs(prevScrollPos - currPosValue);
    const currTimeStamp = Date.now();
    const isDown = currPos.y < prevPos.y;
    if (currTimeStamp - prevTimestamp >= 3000 && currState === isDown) {
      setPrevTimestamp(currTimeStamp);
      submitScroll(currPosValue, currTimeStamp, isDown, scrollLength);
    }
    if (currState !== isDown) {
      setPrevScrollPos(currPosValue);
      submitScroll(currPosValue, currTimeStamp, isDown, scrollLength);
    }
    if (isDown) {
      setCurrState(true);
    } else {
      setCurrState(false);
    }
  });

  const submitScroll = (currPosValue, currTimeStamp, isDown, scrollLength) => {
    if (start) {
      let allData = {
        userId,
        scrollAction: { currPosValue, currTimeStamp, isDown },
      };
      if (scrollLength >= 50) {
        console.log(currPosValue, currTimeStamp, isDown);
        postRequest(allData)
          .then(() => {
            console.log("That's a scroll!");
          })
          .catch(() => {
            console.log("POST failed!");
          });
        // setCount(2);
        // setInterval(() => {
        //   setCount((old) => (old > 0 ? old - 1 : old));
        // }, 1000);
      }
    }
  };

  useEffect(() => {
    const userId = uuidv4();
    const startTime = Date.now();
    setUserId(userId);
    setStartTime(startTime);
    window.scrollTo(0, 0);
    // let getStorage = localStorage.getItem('name');
    // if(getStorage === "survey-survey"){
    //   setSubmitted(true)
    // }

    // const randomNum = getRandomInt(1, 3);
    const randomNum = 3;
    setRandomNum(randomNum);
  }, []);

  const updateClick = (e) => {
    if (e.target.tagName !== "LABEL" && e.target.tagName !== "SPAN" && start) {
      let x = e.pageX;
      let y = e.pageY;
      let screenWidth = window.innerWidth;
      let screenHeight = window.innerHeight;
      let updateMouse = {
        x,
        y,
        screenWidth,
        screenHeight,
      };
      setClickArray(updateMouse);
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
        submitClick(updateMouse);
      } else if (e.target.type === "text") {
        submitClick(updateMouse);
      }
    }
  };

  const submitClick = (updateMouse) => {
    const timeStamp = Date.now();
    let allData = {
      userId,
      clickPosition: { ...updateMouse, timeStamp },
    };
    postRequest(allData)
      .then(() => {
        console.log("That's a click!");
      })
      .catch(() => {
        console.log("POST failed!");
      });
  };

  const toggleEnd = () => {
    setEnd(true);
    localStorage.setItem("name", "survey-survey");
  };

  const toggleStart = () => {
    setStart(true);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="app-container" onClick={updateClick}>
      <div>
        {submitted === true ? (
          <InfoPage type="B" />
        ) : start === false ? (
          <ConsentPage
            userId={userId}
            startTime={startTime}
            toggleStart={toggleStart}
          />
        ) : end === false ? (
          <SurveyContainer
            all={3}
            active={0}
            userId={userId}
            startTime={startTime}
            clickArray={clickArray}
            toggleEnd={toggleEnd}
            submitData={props.submitData}
            randomNum={randomNum}
          />
        ) : (
          <InfoPage type="A" />
        )}
      </div>
      {/* <div className="click-heatmap">
        {clickData.clickArray.map(item=>{
          let left = item.x
          let top = (item.y/item.screenWidth)*window.screen.width
        return <div style={{left:`${left}px`, top:`${top}px`}}className="dot"></div>

  })}

      </div> */}
    </div>
  );
};

export default App;
