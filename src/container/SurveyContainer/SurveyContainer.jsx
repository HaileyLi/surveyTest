import React, { Component } from "react";

import "./SurveyContainer.css";
import surveyEN from "../../data/survey-en.json";
import surveyZH from "../../data/survey-zh.json";
import VersionAB from "../VersionAB";
import VersionCD from "../VersionCD";
import { doSubmitData, doSaveData } from "../../store/actions.js";
import { connect } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
//test on Brian adding info
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
      clickActionData: [],
      fixed: false,
      active: 1,
      loading: false,
    };
  }

  updateProgress = (num) => {
    this.setState({ active: num });
  };

  submitData = () => {
    const { submitData, userId, startTime, clickArray, toggleEnd } = this.props;
    const { formData, clickActionData, randomNum } = this.state;
    const endTime = Date.now();
    const device = navigator.userAgent;
    this.setState({ loading: true });
    let allData = {
      randomNum,
      userId,
      startTime,
      endTime,
      formData,
      clickActionData,
      device,
      clickArray,
    };
    submitData(allData);
    toggleEnd();
    axios({
      url: "http://surveybackend-env.eba-uawqt9qi.ap-northeast-1.elasticbeanstalk.com/",
      method: "POST",
      data: {
        ...allData,
      },
    })
      .then(() => {
        this.setState({ loading: true });
        console.log("POST success!");
      })
      .catch(() => {
        this.setState({ loading: true });
        console.log("POST failed!");
      });
  };

  updateData = (e, id, values) => {
    const { formData, clickActionData } = this.state;
    let value = e.target.value;
    const timeStamp = Date.now();
    // click actions
    let clickAction = {};
    if (values) {
      clickAction = { id, value: values, timeStamp };
    } else {
      clickAction = { id, value, timeStamp };
    }
    clickAction = [...clickActionData, clickAction];
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
    const randomNum = this.getRandomInt(1, 4);
    this.setState({ randomNum });
    const lang = navigator.language;
    if (lang === "zh-CN") {
      this.setState({ lang: "zh" });
    } else {
      this.setState({ lang: "en" });
    }
    window.scrollTo(0, 0);
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  clearSelection = (id) => {
    const { formData, clickActionData } = this.state;
    // click Action
    let clickAction = { id, value: "Clear Selection" };
    clickAction = [...clickActionData, clickAction];
    // clear value
    let newFormData = formData.filter((item) => item.id !== id);
    this.setState({ formData: newFormData, clickActionData: clickAction });
  };

  render() {
    const { formData, active, lang, loading } = this.state;
    const data = lang === "zh" ? surveyZH : surveyEN;
    let randomNum = 1;
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
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Wait, we are submitting your request...
              </Typography>
            </Box>
          </Modal>
        )}
        <h1>A survey about human wellbeing</h1>

        {randomNum === 1 && (
          <VersionAB
            data={data}
            perPage={1}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            clearSelection={this.clearSelection}
            submitData={this.submitData}
            active={active}
            showProgress={true}
            formData={formData}
          />
        )}
        {randomNum === 2 && (
          <VersionAB
            data={data}
            perPage={10}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            clearSelection={this.clearSelection}
            formData={formData}
            submitData={this.submitData}
            active={active}
            showProgress={true}
          />
        )}
        {randomNum === 3 && (
          <VersionCD
            data={data}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            accordion={false}
            clearSelection={this.clearSelection}
            formData={formData}
            submitData={this.submitData}
            showProgress={false}
          />
        )}
        {randomNum === 4 && (
          <VersionCD
            data={data}
            updateProgress={(num) => this.updateProgress(num)}
            updateData={this.updateData}
            accordion={true}
            clearSelection={this.clearSelection}
            formData={formData}
            submitData={this.submitData}
            showProgress={false}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
});
const mapDispatchToProps = (dispatch) => ({
  submitData: (data) => dispatch(doSubmitData(data)),
  saveData: (data) => dispatch(doSaveData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
