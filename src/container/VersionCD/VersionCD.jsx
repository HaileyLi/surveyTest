import React, { Component } from "react";
import "./VersionCD.css";
import SingleQuesitonCard from "../../component/SingleQuestionCard";
import ProgressBar from "../../component/ProgressBar";
import Button from "@mui/material/Button";
import VersionAccordion from "../../component/VersionAccordion";

class VersionCD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      updateData,
      clearSelection,
      formData,
      submitData,
      accordion,
      showProgress,
    } = this.props;
    return (
      <div className="survey-CD">
        <div className="versionCD-container">
          {accordion === false ? (
            data.map((item, i) => (
              <SingleQuesitonCard
                data={item}
                key={`key_${i}`}
                updateData={updateData}
                clearSelection={clearSelection}
                formData={formData}
              />
            ))
          ) : (
            <VersionAccordion
              data={data}
              updateData={updateData}
              clearSelection={clearSelection}
              formData={formData}
            />
          )}
        </div>
        <div className="button-row">
          <Button variant="contained" onClick={submitData}>
            Submit
          </Button>
        </div>
        {showProgress && <ProgressBar type="one-page" all={data.length} />}
      </div>
    );
  }
}
export default VersionCD;
