import React, { Component } from "react";

import "./SurveyContainer.css";
import surveyEN from "../../data/survey-en.json";
import surveyZH from "../../data/survey-zh.json";
import VersionAB from "../VersionAB";
import VersionCD from "../VersionCD";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { postRequest } from "../../Service/actions.js";

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

class SurveyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      clickActionData: {},
      fixed: false,
      active: 1,
      loading: false,
      clickArray: props.clickArray,
      currAction: "",
    };
  }

  updateProgress = (num) => {
    this.setState({ active: num });
  };

  submitAction = (clickAction, timeStamp) => {
    const { userId } = this.props;
    const { clickArray } = this.state;
    let allData = {
      userId,
      clickPosition: { ...clickArray, timeStamp },
      clickAction,
    };
    postRequest(allData)
      .then(() => {
        // console.log("That's an action!");
      })
      .catch(() => {
        console.log("POST failed!");
      });
  };

  submitForm = () => {
    this.setState({ loading: true });
    const { userId, startTime, toggleEnd, randomNum } = this.props;
    const { formData } = this.state;
    const endTime = Date.now();
    const device = navigator.userAgent;
    let allData = {
      randomNum,
      userId,
      startTime,
      endTime,
      formData,
      device,
    };
    postRequest(allData)
      .then(() => {
        console.log("Form submitted!");
        this.setState({ loading: false });
        toggleEnd();
      })
      .catch(() => {
        console.log("POST failed!");
      });
  };

  updateData = (e, id, values) => {
    const { formData, currAction } = this.state;
    let value = e.target.value;
    const timeStamp = Date.now();
    // click actions
    let clickAction = {};
    if (values) {
      clickAction = {
        id,
        timeStamp,
      };
    } else {
      clickAction = {
        id,
        timeStamp,
      };
    }

    if (currAction !== "text") {
      setTimeout(() => this.submitAction(clickAction, timeStamp), 100);
    }
    this.setState({ currAction: e.target.type });

    // update form
    let targetValue = {};
    if (values) {
      if (values.length > 0) targetValue = { id, value: values, timeStamp };
    } else {
      if (value.length > 0) targetValue = { id, value, timeStamp };
    }
    const pastValueFil = formData.filter((item) => item.id === id);
    if (pastValueFil.length > 0) {
      let pastValue = pastValueFil[0];
      if (pastValue.value === targetValue.value) {
        targetValue = {};
      }
    }

    let newFormData = formData;
    let idList = newFormData.map((item) => item.id);
    if (idList.indexOf(id) === -1) {
      newFormData = [...newFormData, targetValue];
    } else {
      newFormData = newFormData.map((item) => {
        if (item.id === id) return targetValue;
        else return item;
      });
    }
    newFormData = newFormData.filter((item) => Object.keys(item).length !== 0);
    this.setState({ formData: newFormData, clickActionData: clickAction });
  };

  componentDidMount() {
    const lang = navigator.language;
    if (lang === "zh-CN") {
      this.setState({ lang: "zh" });
    } else {
      this.setState({ lang: "en" });
    }
    window.scrollTo(0, 0);
  }

  clearSelection = (id) => {
    const { formData, clickActionData } = this.state;
    // click Action
    let clickAction = { id, value: "Clear Selection" };
    clickAction = [...clickActionData, clickAction];
    // clear value
    let newFormData = formData.filter((item) => item.id !== id);
    this.setState({ formData: newFormData, clickActionData: clickAction });
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.clickArray) !==
      JSON.stringify(prevProps.clickArray)
    ) {
      this.setState({
        clickArray: this.props.clickArray,
      });
    }
  }

  render() {
    const { formData, active, lang, loading } = this.state;
    const { randomNum } = this.props;
    const data = lang === "zh" ? surveyZH : surveyEN;
    return (
      <div className="survey-container">
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
              {lang === "zh" ? (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  稍等，您的问卷正在加载中
                </Typography>
              ) : (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Wait, we are submitting your request...
                </Typography>
              )}
            </Box>
          </Modal>
        )}
        {lang === "zh" ? (
          <h1>问卷调查</h1>
        ) : (
          <h1>Hobbies, Interest and Internet</h1>
        )}

        {randomNum === 1 && (
          <VersionAB
            data={data}
            perPage={1}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            clearSelection={this.clearSelection}
            submitData={this.submitForm}
            active={active}
            showProgress={true}
            formData={formData}
            lang={lang}
          />
        )}
        {randomNum === 2 && (
          <VersionCD
            data={data}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            accordion={false}
            clearSelection={this.clearSelection}
            formData={formData}
            submitData={this.submitForm}
            showProgress={false}
            lang={lang}
          />
        )}
        {randomNum === 3 && (
          <VersionCD
            data={data}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            accordion={true}
            clearSelection={this.clearSelection}
            formData={formData}
            submitData={this.submitForm}
            showProgress={false}
            lang={lang}
          />
        )}
      </div>
    );
  }
}

export default SurveyContainer;
