import React, { Component } from "react";
import "./InfoPage.css";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type } = this.props;
    return (
      <div className="survey-container consent-container">
        <h1>A survey about human wellbeing</h1>
        <div className="consent-wrap">
          {type === "A" && (
            <p className="consent-text">Thanks for your submission</p>
          )}
          {type === "B" && (
            <p className="consent-text">
              You have already taken part in the survey.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default InfoPage;
