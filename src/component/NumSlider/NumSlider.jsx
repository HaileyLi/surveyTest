import React from "react";
import "./NumSlider.css";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import Button from "@mui/material/Button";

const NumSlider = (props) => {
  const { data, updateData, clearSelection, formData, accordion } = props;
  const { id, lowestDesc, highestDesc } = data;
  const quesItem = formData
    ? formData.filter((item) => item.id === data.id)
    : [];
  let checkedValue;
  if (quesItem.length === 0) {
    checkedValue = false;
  } else {
    checkedValue = true;
  }
  return (
    <div className="NumSlider-container content-container">
      <div className="slider-wrap">
        <div className="explain">
          <p className="first">{lowestDesc}</p>
          <p className="last">{highestDesc}</p>
        </div>

        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
            <FormControlLabel
              value={item}
              control={<Radio onClick={(e) => updateData(e, id)} />}
              label={item}
              labelPlacement="top"
              checked={
                checkedValue
                  ? quesItem[0].value === item.toString()
                  : checkedValue
              }
              key={`radio${i}`}
            />
          ))}
        </RadioGroup>
      </div>
      {/* {quesItem.length !== 0 && (
        <div className={`delete-row ${accordion && "accordion-btn-row"}`}>
          <Button onClick={() => clearSelection(id)}>Clear Selection</Button>
        </div>
      )} */}
    </div>
  );
};
export default NumSlider;
