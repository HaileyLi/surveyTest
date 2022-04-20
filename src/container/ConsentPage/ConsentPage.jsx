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
        console.log("POST success!");
        toggleStart();
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ errorPage: true });
        console.log("POST failed!");
      });
  };
  render() {
    const { loading, errorPage } = this.state;
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
                  ? "Oops, something wrong happened."
                  : "Thanks for joining! We are preparing your survey..."}
              </Typography>
            </Box>
          </Modal>
        )}
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

export default ConsentPage;
