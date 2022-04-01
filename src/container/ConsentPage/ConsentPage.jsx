import React, { Component } from "react";
import "./ConsentPage.css";
import { doSubmitData, doSaveData } from "../../store/actions.js";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import axios from "axios";
class ConsentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitData = () => {
    const { submitData, userId, startTime, toggleStart } = this.props;
    const startClick = Date.now();
    const device = navigator.userAgent;
    let allData = {
      userId,
      startTime,
      startClick,
      device,
    };
    submitData(allData);
    toggleStart();
    // axios({
    //   url: "http://surveybackend-env.eba-uawqt9qi.ap-northeast-1.elasticbeanstalk.com/",
    //   method: "POST",
    //   data: {
    //     ...allData,
    //   },
    // })
    //   .then(() => {
    //     this.setState({ loading: true });
    //     console.log("POST success!");
    //     toggleStart();
    //   })
    //   .catch(() => {
    //     this.setState({ loading: true });
    //     console.log("POST failed!");
    //   });
  };

  render() {
    return (
      <div className="survey-container consent-container">
        <h1>A survey about human wellbeing</h1>
        <div className="consent-wrap">
          <p className="consent-text">
            TAKING PART IN THE PROJECT: - I have read and understood the project
            information sheet dated 06/12/2021or the project has been fully
            explained to me in the above written information sheet. (If you
            answer No to this question, you will not proceed with this survey.)
            - I understand that I choose to participate as a volunteer in this
            research, which does not create a legally binding agreement nor is
            it intended to create an employment relationship with the University
            of Sheffield. - I understand that my taking part is voluntary and
            that I can withdraw from the study up until the survey remains open
            and before the data starts to be analysed. I also understand that I
            do not have to give any reasons for why - I no longer want to take
            part and there will be no adverse consequences if I choose to
            withdraw. HOW MY INFORMATION WILL BE USED DURING AND AFTER THE
            PROJECT: - I understand my personal details such as name, phone
            number, address and email address etc. will not be revealed to
            people outside the project. - I understand and agree that my
            responses may be aggregated and quoted in publications, reports, web
            pages, and other research outputs. I understand that I will not be
            named in these outputs. - I understand and agree that other
            authorised researchers will have access to this data, and they may
            use it in publications only if they agree to preserve the
            confidentiality of the information as requested in this form. SO
            THAT THE INFORMATION YOU PROVIDE CAN BE LEGALLY USED BY THE
            RESEARCHERS: - I agree to assign the copyright I hold in any
            materials generated as part of this project to The University of
            Sheffield.
          </p>
          <div className="button-row">
            <Button variant="contained" onClick={this.submitData}>
              Start
            </Button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsentPage);
