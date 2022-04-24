import React from "react";
import "./VersionAccordion.css";
import AccordionCard from "./AccordionCard.jsx";

export default function VersionAccordion(props) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data, updateData, clearSelection, formData, lang } = props;

  const formDataList = formData.map((item) => item.id);

  const toNextQues = (i) => {
    setExpanded(`panel${i + 1}`);
  };

  return data.map((item, i) => {
    return (
      <AccordionCard
        data={item}
        i={i}
        updateData={updateData}
        clearSelection={clearSelection}
        formData={formData}
        expanded={expanded}
        handleChange={handleChange}
        formDataList={formDataList}
        toNextQues={toNextQues}
        key={`key_acc_${i}`}
        lang={lang}
      ></AccordionCard>
    );
  });
}
