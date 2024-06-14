import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Rating, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
//   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ openModal, handleCloseModal }) {

    const [carRatingValue,setCarRatingValue] = React.useState(0)
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="carRating"
                value={carRatingValue}
                onChange={(event, newValue) => {
                  setCarRatingValue(newValue);
                }}
              />
            </Grid>
            <Grid item mt={2} xs={12}>

          <TextField fullWidth multiline rows={4} id="standard-basic" label="Your Review..." variant="standard" />
            </Grid>
            <Grid item mt={3} xs={8} alignSelf={'center'}>
                <Button variant="contained" color="primary">Post Review</Button>

            </Grid>
          </Grid>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
