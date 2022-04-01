import React, { Component } from "react";
import "./VersionAB.css";
import SingleQuesitonCard from "../../component/SingleQuestionCard";
import Button from "@mui/material/Button";
import ProgressBar from "../../component/ProgressBar";

class VersionAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      lastPage: false,
    };
  }

  separatePages = (perPage, data) => {
    let newData = [];
    let subData = [];
    if (perPage === 1) {
      newData = data.map((item) => [item]);
    }

    for (let i = 0; i < data.length; i++) {
      if (i + 1 === data.length) {
        subData.push(data[i]);
        newData.push(subData);
        return newData;
      } else if (i !== 0 && (i + 1) % perPage === 0) {
        subData.push(data[i]);
        newData.push(subData);
        subData = [];
      } else {
        subData.push(data[i]);
      }
    }
    return newData;
  };

  nextPage = (e) => {
    let { page } = this.state;
    const { perPage, data, updateProgress } = this.props;
    const all = Math.ceil(data.length / perPage);
    if (page === all - 1) {
      page += 1;
      this.setState({ lastPage: true });
      this.setState({ page });
      updateProgress(page);
    } else {
      page += 1;
      this.setState({ page });
      updateProgress(page);
    }
    window.scrollTo(0, 0);

    const { updateData } = this.props;
    updateData(e, "Next", page);
  };

  backPage = (e) => {
    let { page } = this.state;
    const { updateProgress } = this.props;
    if (page === 2) {
      page -= 1;
      this.setState({ page });
      updateProgress(page);
    } else {
      page -= 1;
      this.setState({ page });
      updateProgress(page);
    }
    window.scrollTo(0, 0);
    this.setState({ lastPage: false });
    const { updateData } = this.props;
    updateData(e, "Back", page);
  };

  render() {
    const {
      perPage,
      data,
      updateData,
      clearSelection,
      submitData,
      formData,
      showProgress,
    } = this.props;
    const pageDivide = this.separatePages(perPage, data);
    const { page, lastPage } = this.state;
    return (
      <div className="survey-AB">
        <div className="versionAB-container">
          {pageDivide[page - 1].map((item, i) => (
            <SingleQuesitonCard
              data={item}
              key={`key${i}`}
              updateData={updateData}
              clearSelection={clearSelection}
              formData={formData}
            />
          ))}
        </div>
        <div className="button-row">
          {page > 1 && (
            <Button variant="outlined" onClick={(e) => this.backPage(e)}>
              Back
            </Button>
          )}
          {lastPage ? (
            <Button variant="contained" onClick={submitData}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={(e) => this.nextPage(e)}>
              Next
            </Button>
          )}
        </div>
        {showProgress && (
          <ProgressBar
            type="one-page"
            all={data.length}
            active={page * perPage}
          />
        )}
      </div>
    );
  }
}
export default VersionAB;
