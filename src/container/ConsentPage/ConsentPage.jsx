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
  }

  submitData = () => {
    this.setState({ loading: true });
    const { userId, startTime, toggleStart } = this.props;
    const startClick = Date.now();
    const device = navigator.userAgent;
    let allData = {
      userId,
      startTime,
      device,
      startClick,
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
                  ? "加载中"
                  : "Thanks for joining! We are preparing your survey..."}
              </Typography>
            </Box>
          </Modal>
        )}
        <h1>{lang === "zh" ? "问卷调查" : "Hobbies, Interest and Internet"}</h1>
        <div className="consent-wrap">
          {lang === "zh" ? (
            <p className="consent-text">问卷调查的介绍。。</p>
          ) : (
            <>
              <h2>Consent</h2>
              <h3>Taking Part in the Project</h3>
              <p className="consent-text">
                I have read and understood the project information sheet dated
                01/07/2022 or the project has been fully explained to me. (If
                you will answer No to this question, please do not proceed with
                this consent form until you are fully aware of what your
                participation in the project will mean.)
              </p>
              <p className="consent-text">
                I have been given the opportunity to ask questions about the
                project.
              </p>
              <p className="consent-text">
                I agree to take part in the project. I understand that taking
                part in the project will include completing a questionnaire with
                the recording of click and scroll positions, filling out
                duration, device model and browser name, and action sequence.
              </p>
              <p className="consent-text">
                I understand that by choosing to participate as a volunteer in
                this research, this does not create a legally binding agreement
                nor is it intended to create an employment relationship with the
                University of Sheffield.
              </p>
              <p className="consent-text">
                I understand that my taking part is voluntary and that I can
                withdraw from the study before 25/08/2022; I do not have to give
                any reasons for why I no longer want to take part and there will
                be no adverse consequences if I choose to withdraw.
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
                publications, reports, web pages, and other research outputs. I
                understand that I will not be named in these outputs unless I
                specifically request this.
              </p>
              <p className="consent-text">
                I understand and agree that other authorised researchers will
                have access to this data only if they agree to preserve the
                confidentiality of the information as requested in this form.
              </p>
              <p className="consent-text">
                I understand and agree that other authorised researchers may use
                my data in publications, reports, web pages, and other research
                outputs, only if they agree to preserve the confidentiality of
                the information as requested in this form.
              </p>
              <p className="consent-text">
                I give permission for the data collected from the survey that I
                provide to be deposited in secure server provided by the
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
            <p>
              <small>
                <i>
                  *By clicking "Start", you accept to the terms and conditions
                  listed above.
                </i>
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ConsentPage;
