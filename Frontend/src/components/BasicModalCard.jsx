import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "7%",
  left: "7%",
  transform: 'translate("-50%", "-50%")',
  width: "85%",
  height: "85%",
  borderRadius: "50px",
  backgroundColor: "white",
  border: " 2px solid #c288ff",
  boxShadow:
    "0px 11px 15px -7px rgb(255 255 255 / 20%), 0px 24px 38px 3px rgb(255 255 255 / 14%), 0px 9px 46px 8px rgb(255 255 255 / 12%)",
  padding: "32px",
};

export default function BasicModalCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "wrap",
        aligncontent: "center",
        justifycontent: "center",
        alignitems: "center",
      }}
    >
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
