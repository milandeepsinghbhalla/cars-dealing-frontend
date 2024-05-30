import { Button, Grid, TextField, Typography } from "@mui/material";
import signUpImg from "../assets/images/signup-img.jpg"
import { useState } from "react";
import links from "../assets/util/links";
const RegistrationPage = () => {
    
    const [registerformdata,setRegisterFormData] = useState({
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleSignup = (e)=>{
        console.log('signup data:- ',registerformdata)
        let error = {
            err: false,
            message: ''
        }
        // checking required
        Object.keys(registerformdata).some((key)=>{
            if(registerformdata[key]=='' || registerformdata[key].length== 0){
                error.err = true
                error.message = 'All feilds are Required.'
                return true;
            }
            return false;
        }) 
        // checking email
        if(!error.err){
            function isValidEmail(email) {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email);
              }
            if(!isValidEmail(registerformdata.email)){
                error.err = true;
                error.message = 'Not a valid email.'
            }
        }
        // checking confirm password
        if(!error.err){
            if(registerformdata.password != registerformdata.confirmPassword){
                error.err = true;
                error.message = 'Password and confirm password dosen\'t match';
            }

        }
        if(error.err){
            alert(error.message);
        }
        if(!error.err){
            // send data to backend.
            let url = links.backendUrl + '/signup-customer'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(registerformdata), // This is the data you want to send
                headers: { 'Content-Type': 'application/json' } // Specify JSON content
              })
              .then(response =>{
                if(response.status<200 || response.status>299){
                    alert('error while signing up');
                }
                return response.json();
              } )
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.error(error);
              });
        }
    }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item sx={{
        display:{
            xs: 'none',
            md: 'flex-item'
        }
      }} xs={11} md={6}>
        <img style={{
            margin: '3em 0 0 3em'
        }} src={signUpImg} width={'400px'} height={'400px'} alt="sign up image"></img>
      </Grid>
      <Grid item xs={11} md={6}>
        <form>
          <Grid container p={4}>
            <Grid container mt={2} xs={12}>
              <Typography variant="h5">Registration</Typography>
            </Grid>

            <Grid container mt={2} xs={12}>
              <TextField
                size="small"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.firstName = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.firstName}
                fullWidth
                id="firstName-basic"
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
               size="small"
               onChange={(e)=>{
                setRegisterFormData(oldData=>{
                    let newData = {...oldData}
                    newData.lastName = e.target.value
                    return newData;
                })
                
            }}
            value={registerformdata.lastName}
                fullWidth
                id="LasttName-basic"
                label="Lastt Name"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
                fullWidth
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.email = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.email}
                size="small"
                id="Email-basic"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
                fullWidth
                size="small"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.password = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.password}
                id="Password-basic"
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
                fullWidth
                size="small"
                type="password"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.confirmPassword = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.confirmPassword}
                id="ConfirmPassword-basic"
                label="Confirm Password"
                variant="outlined"
              />
            </Grid>

            <Grid container mt={3} ml={'auto'} mr={'auto'} textAlign={'center'} xs={10}>
              <Button onClick={handleSignup} fullWidth variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;
