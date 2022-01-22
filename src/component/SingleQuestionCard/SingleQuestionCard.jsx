import React from "react";
import "./SingleQuestionCard.css";
import FreeText from "../FreeText";
import Checkbox from "../BoxSelection";
import MultipleChoice from "../MultipleChoice";
import StarRating from "../StarRating";
import NumSlider from "../NumSlider";

export default function SingleQuestionCard(props) {
  const { data, updateData, clearSelection, formData } = props;
  const { index, body, type, id } = data;
  const quesItem = formData ? formData.filter((item) => item.id === id) : [];
  let checkedValue;
  if (quesItem.length === 0) {
    checkedValue = false;
  } else {
    checkedValue = true;
  }
  return (
    <div className="card-container">
      <>
        <p className="question-body">
          {index}. {body}
        </p>
        {type === "checkbox" && (
          <Checkbox
            data={data}
            updateData={updateData}
            clearSelection={clearSelection}
            formData={formData}
            values={checkedValue ? quesItem[0].value : []}
          />
        )}
        {type === "choice" && (
          <MultipleChoice
            data={data}
            updateData={updateData}
            clearSelection={clearSelection}
            formData={formData}
          />
        )}
        {type === "text" && (
          <FreeText
            data={data}
            updateData={updateData}
            clearSelection={clearSelection}
            formData={formData}
          />
        )}
        {type === "rating" && (
          <StarRating
            data={data}
            updateData={updateData}
            clearSelection={clearSelection}
            formData={formData}
          />
        )}
        {type === "slider" && (
          <NumSlider
            data={data}
            updateData={updateData}
            clearSelection={clearSelection}
            formData={formData}
          />
        )}
      </>
    </div>
  );
}
