import { Grid, TextField, Typography, styled } from "@mui/material";
import myColors from "../assets/util/myColors";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#212121",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const AddCarForm = () => {
  const carFormStyles = {};
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid
          bgcolor={myColors.myGrey}
          sx={{
            paddingY: "1.5em",
            paddingX: "1.5em",

            border: "1px solid #212121",
            boxShadow: "3px 3px",
            borderRadius: "25px",
          }}
          xs={10}
          md={7}
          mt={3}
        >
          <Typography textAlign={"center"} variant="h5">
            Add Cars
          </Typography>
          <Grid container justifyContent={"space-between"}>
            <Grid pt={2} item xs={12}>
              <CssTextField fullWidth label="Car Name" id="carName" />
            </Grid>
          </Grid>
          <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
            
            <CssTextField fullWidth label="year"  id="carName" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCarForm;
