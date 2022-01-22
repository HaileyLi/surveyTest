import React from "react";
import "./StarRating.css";
import { Rating } from "@mui/material";

const StarRating = (props) => {
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
    <div className="StarRating-container content-container">
      <div className="rating-wrap">
        <Rating
          name="customized-10"
          defaultValue={checkedValue ? quesItem[0].value : 0}
          max={7}
          size="large"
          onChange={(e) => updateData(e, id)}
        />
      </div>
    </div>
  );
};
export default StarRating;
