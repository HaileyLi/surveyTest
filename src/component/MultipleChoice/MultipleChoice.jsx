import React, { Component } from "react";
import "./MultipleChoice.css";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";

class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, updateData, clearSelection, formData, accordion } =
      this.props;
    const { selections, id } = data;
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
      <div className="MultipleChoice-container content-container">
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {selections.map((item, i) => (
            <FormControlLabel
              value={item}
              control={<Radio onChange={(e) => updateData(e, id)} />}
              label={item}
              key={`item${i}`}
              checked={checkedValue ? quesItem[0].value === item : checkedValue}
            />
          ))}
        </RadioGroup>
        {/* {quesItem.length !== 0 && (
          <div className={`delete-row ${accordion && "accordion-btn-row"}`}>
            <Button onClick={() => clearSelection(id)}>Clear Selection</Button>
          </div>
        )} */}
      </div>
    );
  }
}
export default MultipleChoice;
