import { Grid, Typography } from "@mui/material";
import jumbotronImg from "../assets/images/car-home-bg-3.jpeg";
const Jumbotron = () => {
  // const jumbotronContainerStyles = {
  //     backgroun
  // }
  return (
    <>
    

      <Grid container
        sx={{
          backgroundImage: `url(${jumbotronImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Adjust height and width as needed
          width: "100vw",
          position: "absolute",
        }}
        xs={12}
      >
        <section
          style={{
            position: "relative",
            left: "10vw",
            top: "10vh",
          }}
        >
          <Typography color={"white"} variant="h3" component={"h1"}>
            Get your Dream Car Today!
          </Typography>
          <Typography mt={1} color={"white"} variant="h4" component={"h2"}>
            Discover Top-Notch New and Pre-Owned Japanese Cars at Unbeatable
            Prices!
          </Typography>
        </section>
      </Grid>
    
    </>
  );
};

export default Jumbotron;
