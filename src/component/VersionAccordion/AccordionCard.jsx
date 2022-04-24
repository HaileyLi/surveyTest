import React from "react";
import "./VersionAccordion.css";
import FreeText from "../FreeText";
import Checkbox from "../BoxSelection";
import MultipleChoice from "../MultipleChoice";
import StarRating from "../StarRating";
import NumSlider from "../NumSlider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function AccordionCard(props) {
  const {
    data,
    i,
    updateData,
    clearSelection,
    formData,
    handleChange,
    expanded,
    formDataList,
    toNextQues,
    lang,
  } = props;
  const { id, index, body, type } = data;
  const quesItem = formData ? formData.filter((item) => item.id === id) : [];
  let checkedValue;
  if (quesItem.length === 0) {
    checkedValue = false;
  } else {
    checkedValue = true;
  }
  return (
    <Accordion
      expanded={expanded === `panel${index}`}
      onChange={handleChange(`panel${index}`)}
      key={`accordion${i}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
      >
        <div className="ques-container">
          <p className="question-body accord">
            <strong>
              {index}. {body}
            </strong>
          </p>

          {formDataList.indexOf(id) !== -1 && (
            <div className="answered-div">
              {lang === "zh" ? (
                <p className="answered-flag">已回答</p>
              ) : (
                <p className="answered-flag">Answered</p>
              )}
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="ques-div">
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
              accordion={true}
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
              accordion={true}
            />
          )}
          <div className="next-div">
            {lang === "zh" ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => toNextQues(i + 1)}
              >
                下一个问题
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => toNextQues(i + 1)}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
