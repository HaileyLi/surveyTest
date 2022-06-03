import React, { Component } from "react";
import "./InfoPage.css";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const lang = navigator.language;
    if (lang === "zh-CN") {
      this.setState({ lang: "zh" });
    } else {
      this.setState({ lang: "en" });
    }
    window.scrollTo(0, 0);
  }

  render() {
    const { type } = this.props;
    const { lang } = this.state;
    return (
      <div className="survey-container consent-container">
        <p className="sup-title">
          {lang === "zh" ? "问卷调查" : "A survey about"}
        </p>
        <h1 className="survey-title">
          {lang === "zh"
            ? "爱好，兴趣与网络"
            : "Hobbies, Interest and Internet"}
        </h1>
        <div className="consent-wrap">
          {type === "A" && (
            <p className="consent-text">
              {" "}
              {lang === "zh"
                ? "问卷已提交成功。感谢您的参与！"
                : "Successfully submitted. Thanks for your participation."}
            </p>
          )}
          {type === "B" && (
            <p className="consent-text">
              {lang === "zh"
                ? "您已填写过此调查问卷。"
                : "You have already taken part in the survey."}
            </p>
          )}

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

          {lang !== "zh" && (
            <p>
              The following code gives you credits that can be used to get free
              research participants at SurveySwap.io.
              <a href="https://surveyswap.io/sr/FKQH-4629-EIJ3" target="_blank">
                https://surveyswap.io/sr/FKQH-4629-EIJ3
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default InfoPage;
