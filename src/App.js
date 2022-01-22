import './App.css';
import SurveyContainer from './container/SurveyContainer'
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect }  from "react";
import ConsentPage from './container/ConsentPage/ConsentPage';
import clickData from "./data/click-data.json";

import InfoPage from './container/InfoPage/InfoPage';
const App = () => {


  const [start, setStart] = useState(false);
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [clickArray, setClickArray] = useState([]);
  const [end, setEnd] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const userId = uuidv4()
    const startTime = Date.now()
    setUserId(userId)
    setStartTime(startTime)
    window.scrollTo(0, 0);
    let getStorage = localStorage.getItem('name');
if(getStorage === "survey-survey"){
  setSubmitted(true)
}
  }, []);

  const updateClick = (e) =>{
    
    let newClickArray = clickArray
let x = e.pageX; //x position within the element.
let y = e.pageY;  //y position within the element.
let screenWidth=window.screen.width
let screenHeight = window.screen.height
let updateMouse = {
      start,
      x,y,screenWidth,screenHeight
    }
    newClickArray = [...newClickArray, updateMouse]
       setClickArray(newClickArray)
       console.log(updateMouse)
  }

  const toggleEnd = ()=>{
    setEnd(true)
     localStorage.setItem('name','survey-survey');
  }

  const toggleStart=()=>{
    setStart(true)
  }
  return (
    <div className="app-container" onClick={updateClick}>
       <div >
      
      {submitted === true? <InfoPage type="B"/>:start===false?
      <ConsentPage 
      userId={userId} 
      startTime={startTime} 
      toggleStart={toggleStart}/>
      : end === false?
      <SurveyContainer 
      all={3} 
      active={0} 
      userId={userId} 
      startTime={startTime} 
      clickArray={clickArray} 
      toggleEnd={toggleEnd}/>:
      <InfoPage type="A"/>
    }
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
  
}

export default App;
