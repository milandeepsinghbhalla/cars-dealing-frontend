import { Button, Grid, TextField, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";
import { Password } from "@mui/icons-material";
import { useState } from "react";
import links from "../assets/util/links";
import { useDispatch } from 'react-redux';
// import { userDataSlice } from "../reduxStore/store";
import { loginUser } from "../reduxStore/userDataSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // send data to backend
    console.log("signup data:- ", loginFormData);
    let error = {
      err: false,
      message: "",
    };
    function isValidEmail(email) {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
    if (!isValidEmail(loginFormData.email)) {
      error.err = true;
      error.message = "Not a valid email.";
    }
    if(error.err){
      alert(error.message)
    }
    if(!error.err){
      let url  = links.backendUrl + '/login-customer';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginFormData), // This is the data you want to send
        headers: { 'Content-Type': 'application/json' } // Specify JSON content
      })
      .then(response =>{
        if(response.status<200 || response.status>299){
            alert('error while loging in.');
        }
        return response.json();
      } )
      .then(data => {
        console.log('login Data:- ',data);
        dispatch(loginUser({userData: data.userData}))
        localStorage.setItem('userData',JSON.stringify(data.userData))
        navigate('/', { replace: true });

      })
      .catch(error => {
        console.error('login error:- ',error);
        alert(error.message);
      });
    }
  };

  return (
    <>
      <Grid container p={4} justifyContent={"center"}>
        <Grid id={"logoContainer"} item xs={11} md={6}>
          <Grid container textAlign={"center"}>
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                height: "7.5rem",
                width: "7.5rem",
              }}
              src={logo}
              alt="Japan Direct Autos"
            ></img>
          </Grid>
          <Grid container mt={2} textAlign={"center"}>
            <Grid ml={"auto"} mr={"auto"} item>
              <Typography variant="h5">
                Welcome Back, You Were Missed.
              </Typography>
            </Grid>
          </Grid>
          <form>
            <Grid
              container
              p={2}
              mt={2}
              ml={"auto"}
              mr={"auto"}
              xs={11}
              md={7}
              justifyContent={"center"}
            >
              <Grid container mb={2} justifyContent={"center"} xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setLoginFormData((oldData) => {
                      let newData = { ...oldData };
                      newData.email = e.target.value;
                      return newData;
                    });
                  }}
                  value={loginFormData.email}
                  size="small"
                  id="Email-basic"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid container mb={2} xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setLoginFormData((oldData) => {
                      let newData = { ...oldData };
                      newData.password = e.target.value;
                      return newData;
                    });
                  }}
                  value={loginFormData.password}
                  size="small"
                  id="Email-basic"
                  label="Passsword"
                  type="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid container mb={2} xs={12}>
                <Button
                  mt={2}
                  onClick={handleLogin}
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
