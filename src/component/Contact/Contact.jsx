import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Contact.css";
import IconButton from "@mui/material/IconButton";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { lang } = props;
  return (
    <div className="contact-us">
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={handleOpen}
      >
        <ContactSupportIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {lang === "zh" ? (
              <div className="contact-info">
                <p>
                  本项目由Mengdie Zhuang (m.zhuang@sheffield.ac.uk) 监督，Xiwen
                  Li (xli346@sheffield.ac.uk) 创建。
                  如果您对参与本研究的任何方面有任何困难或希望表达担忧，请联系谢菲尔德大学信息学院研究伦理协调员
                  Peter Bath 教授和 Sophie Rutter 博士
                  (ischool_ethics@sheffield.ac.uk）。
                </p>
              </div>
            ) : (
              <div className="contact-info">
                <p>
                  This project is supervised by Mengdie Zhuang
                  (m.zhuang@sheffield.ac.uk) and created by Xiwen Li
                  (xli346@sheffield.ac.uk). If you have any difficulties with,
                  or wish to voice concern about, any aspect of your
                  participation in this study, please contact Professor Peter
                  Bath and Dr Sophie Rutter, Research Ethics Coordinators,
                  Information School, The University of Sheffield
                  (ischool_ethics@sheffield.ac.uk).
                </p>
              </div>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
