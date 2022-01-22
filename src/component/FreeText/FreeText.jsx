import React from "react";
import "./FreeText.css";
import { Input } from "@mui/material";

const FreeText = (props) => {
  const { data, updateData, formData } = props;
  const { id } = data;
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
    <div className="FreeText-container content-container">
      <Input
        classes={{ fontsize: "14px" }}
        placeholder="Your answer"
        onChange={(e) => updateData(e, id)}
        value={checkedValue ? quesItem[0].value : ""}
      />
    </div>
  );
};
export default FreeText;
