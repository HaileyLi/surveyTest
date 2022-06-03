import React, { Component } from "react";
import "./VersionCD.css";
import SingleQuesitonCard from "../../component/SingleQuestionCard";
import Button from "@mui/material/Button";
import VersionAccordion from "../../component/VersionAccordion";

class VersionCD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, updateData, formData, submitData, accordion, lang } =
      this.props;
    return (
      <div className="survey-CD">
        <div className="versionCD-container">
          {accordion === false ? (
            data.map((item, i) => (
              <SingleQuesitonCard
                data={item}
                key={`key_ques_${i}`}
                updateData={updateData}
                formData={formData}
                lang={lang}
              />
            ))
          ) : (
            <VersionAccordion
              data={data}
              updateData={updateData}
              formData={formData}
              lang={lang}
            />
          )}
        </div>
        <div className="button-row">
          <Button variant="contained" onClick={submitData}>
            {lang === "zh" ? "提交" : "Submit"}
          </Button>
          {lang !== "zh" && (
            <p>
              Redeem Survey Code with one click:{" "}
              <a
                href="https://www.surveycircle.com/BYQ1-TY82-QG13-ZYP6"
                target="_blank"
              >
                https://www.surveycircle.com/BYQ1-TY82-QG13-ZYP6
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }
}
export default VersionCD;
