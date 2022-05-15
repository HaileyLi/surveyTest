import React, { Component } from "react";
import "./ConsentPage.css";
import { postRequestInit } from "../../Service/actions.js";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

class ConsentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorPage: false,
    };
  }

  componentDidMount() {
    const lang = navigator.language;
    if (lang === "zh-CN") {
      this.setState({ lang: "zh" });
    } else {
      this.setState({ lang: "en" });
    }
    window.scrollTo(0, 0);

    const browser = this.getBrowserName();
    const deviceType = this.getDeviceType();
    this.setState({ browser });
    this.setState({ deviceType });
  }

  getBrowserName = () => {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = "" + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    return browserName;
  };

  getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  submitData = () => {
    this.setState({ loading: true });
    const { userId, startTime, toggleStart, randomNum } = this.props;
    const { browser, deviceType } = this.state;
    const startClick = Date.now();
    const userAgent = navigator.userAgent;
    let allData = {
      userId,
      startTime,
      userAgent,
      startClick,
      layout: randomNum,
      browser,
      deviceType,
    };
    postRequestInit(allData)
      .then(() => {
        // console.log("POST success!");
        toggleStart();
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ errorPage: true });
        console.log("POST failed!");
      });
  };
  render() {
    const { loading, errorPage, lang } = this.state;
    return (
      <div className="survey-container consent-container">
        {loading && (
          <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <CircularProgress />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {errorPage
                  ? lang === "zh"
                    ? "错误"
                    : "Oops, something wrong happened."
                  : lang === "zh"
                  ? "感谢您的参与！问卷正在加载中..."
                  : "Thanks for joining! We are preparing your survey..."}
              </Typography>
            </Box>
          </Modal>
        )}
        <p className="sup-title">
          {lang === "zh" ? "问卷调查" : "A survey about"}
        </p>
        <h1 className="survey-title">
          {lang === "zh"
            ? "爱好，兴趣与网络"
            : "Hobbies, Interest and Internet"}
        </h1>
        <div className="consent-wrap">
          {lang === "zh" ? (
            <>
              <div className="consent-scroll">
                <h2>同意与告知</h2>
                <h3>参与问卷调查</h3>
                <p className="consent-text">
                  我已阅读并理解 2022 年 1 月 7
                  日的项目信息表或项目已向我充分解释。
                </p>
                <p className="consent-text">我有机会就该项目提出问题。</p>
                <p className="consent-text">
                  我同意参加这个项目。我了解参与该项目将包括完成一份问卷，其中记录点击和滚动位置、填写持续时间、设备型号和浏览器名称以及操作顺序。
                </p>
                <p className="consent-text">
                  我明白，选择作为志愿者参与这项研究，并不构成具有法律约束力的协议，也不打算与谢菲尔德大学建立雇佣关系。
                </p>
                <p className="consent-text">
                  我明白我的参与是自愿的，我可以在 25/08/2022
                  之前退出研究；我不必说明我不再想参加的任何理由，如果我选择退出也不会产生任何不良后果。
                </p>
                <h3>在项目期间和之后如何使用我的信息</h3>
                <p className="consent-text">
                  我了解我的个人信息以及问卷中填写的值不会透露给项目以外的人。
                </p>
                <p className="consent-text">
                  我理解并同意我的话可能会在出版物、报告、网页和其他研究成果中被引用。我了解，除非我特别要求，否则我不会在这些输出中被命名。
                </p>
                <p className="consent-text">
                  我理解并同意，只有在其他授权研究人员同意按照本表格要求对信息保密的情况下，他们才能访问这些数据。
                </p>
                <p className="consent-text">
                  我理解并同意其他授权研究人员可以在出版物、报告、网页和其他研究成果中使用我的数据，前提是他们同意按照本表格的要求对信息保密。
                </p>
                <p className="consent-text">
                  我允许从我提供的调查中收集的数据存储在谢菲尔德大学提供的安全服务器中，以便将来用于研究和学习
                </p>
                <h3>以便研究人员可以合法使用您提供的信息</h3>
                <p className="consent-text">
                  我同意将我在作为本项目一部分生成的任何材料中拥有的版权转让给谢菲尔德大学。
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="consent-scroll">
                <h2>Consent</h2>
                <h3>Taking Part in the Project</h3>
                <p className="consent-text">
                  I have read and understood the project information sheet dated
                  01/07/2022 or the project has been fully explained to me. (If
                  you will answer No to this question, please do not proceed
                  with this consent form until you are fully aware of what your
                  participation in the project will mean.)
                </p>
                <p className="consent-text">
                  I have been given the opportunity to ask questions about the
                  project.
                </p>
                <p className="consent-text">
                  I agree to take part in the project. I understand that taking
                  part in the project will include completing a questionnaire
                  with the recording of click and scroll positions, filling out
                  duration, device model and browser name, and action sequence.
                </p>
                <p className="consent-text">
                  I understand that by choosing to participate as a volunteer in
                  this research, this does not create a legally binding
                  agreement nor is it intended to create an employment
                  relationship with the University of Sheffield.
                </p>
                <p className="consent-text">
                  I understand that my taking part is voluntary and that I can
                  withdraw from the study before 25/08/2022; I do not have to
                  give any reasons for why I no longer want to take part and
                  there will be no adverse consequences if I choose to withdraw.
                </p>
                <h3>
                  How my information will be used during and after the project
                </h3>
                <p className="consent-text">
                  I understand my personal details such as name, phone number,
                  address and email address, and values filled in the
                  questionnaire will not be revealed to people outside the
                  project.
                </p>
                <p className="consent-text">
                  I understand and agree that my words may be quoted in
                  publications, reports, web pages, and other research outputs.
                  I understand that I will not be named in these outputs unless
                  I specifically request this.
                </p>
                <p className="consent-text">
                  I understand and agree that other authorised researchers will
                  have access to this data only if they agree to preserve the
                  confidentiality of the information as requested in this form.
                </p>
                <p className="consent-text">
                  I understand and agree that other authorised researchers may
                  use my data in publications, reports, web pages, and other
                  research outputs, only if they agree to preserve the
                  confidentiality of the information as requested in this form.
                </p>
                <p className="consent-text">
                  I give permission for the data collected from the survey that
                  I provide to be deposited in secure server provided by the
                  University of Sheffield so it can be used for future research
                  and learning
                </p>
                <h3>
                  So that the information you provide can be used legally by the
                  researchers
                </h3>
                <p className="consent-text">
                  I agree to assign the copyright I hold in any materials
                  generated as part of this project to The University of
                  Sheffield.
                </p>
              </div>
            </>
          )}
          <div className="button-row">
            {lang === "zh" ? (
              <Button variant="contained" onClick={this.submitData}>
                开始
              </Button>
            ) : (
              <Button variant="contained" onClick={this.submitData}>
                Start
              </Button>
            )}
            {lang === "zh" ? (
              <p>
                <small>
                  <i>*点击“开始”即表示您接受以上所列的条款和条件。</i>
                </small>
              </p>
            ) : (
              <p>
                <small>
                  <i>
                    *By clicking "Start", you accept to the terms and conditions
                    listed above.
                  </i>
                </small>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ConsentPage;
