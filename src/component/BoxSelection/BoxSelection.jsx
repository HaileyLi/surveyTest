import React from "react";
import "./BoxSelection.css";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const BoxSelection = (props) => {
  const updateCheckbox = (e, i) => {
    const { values } = props;
    const { data, updateData } = props;
    const { id } = data;
    let newValues = [];
    if (values.indexOf(i) === -1) {
      newValues = [...values, i];
    } else {
      newValues = values.filter((item) => item !== i);
    }
    updateData(e, id, newValues);
  };

  const { data, values } = props;
  const { selections } = data;

  return (
    <FormGroup>
      <div className="Checkbox-container content-container">
        <div className="checkbox-group">
          {selections.map((item, i) => (
            <div className="checkbox-row" key={`box${i}`}>
              <FormControlLabel
                control={<Checkbox />}
                checked={values.indexOf(i) !== -1}
                onChange={(e) => updateCheckbox(e, i)}
                label={item}
              />
            </div>
          ))}
        </div>
      </div>
    </FormGroup>
  );
};
export default BoxSelection;
