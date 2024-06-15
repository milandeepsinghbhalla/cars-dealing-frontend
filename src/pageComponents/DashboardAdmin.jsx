import { useEffect, useState } from "react";
// import Car from "../models/Car.js";
import { Grid } from "@mui/material";
import DashboardDrawer from "../components/DashboardDrawer.jsx";
import AddCarForm from "../components/AddCarForm.jsx";
import links from "../assets/util/links.js";
import { useSelector } from "react-redux";
import AdminCheckDialog from "../components/AdminCheckDialog.jsx";
const DashboardAdmin = ()=>{

    const [isAdmin,setIsAdmin] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
    console.log('userToken',userToken);
    useEffect(()=>{
        // let tataPunch = Car(1,'Tata Punch','Micro-Suv',2021,34523,'Tata');
        // console.log('Tata punch:- ',tataPunch);

        // check for admin
        // fetch(links.backendUrl + '/check-admin',{

        // })
        let url = links.backendUrl + '/check-admin'
        fetch(url, {
            method: 'POST',
            headers: {
              'authorization': `Bearer ${userToken}`,
              // Add other headers if needed (e.g., Content-Type)
            },
            // Optional: body containing the data to send
            // body: JSON.stringify(yourData) // Assuming data is a JavaScript object
          })
        .then((result)=>{
            if(result.status<200 || result.status>299){
                // let newError = {}
                result.json().then(err=>{
                    console.log('error while admin check',err)
                    // alert('error while admin check')
                })
            }
            return result.json()
         })
         .then((adminCheckResult)=>{
            if(adminCheckResult.isAdmin){
                setIsAdmin(true);
            }
            else{
                setIsAdmin(false)
            }
         })
    },[])

    return (
        <>{
            !isAdmin ? <AdminCheckDialog open={open} handleClose={handleClose} /> : (

        <Grid>

        <DashboardDrawer />
        <AddCarForm />
        </Grid>
            )
        }
        </>
    )
}

export default DashboardAdmin;