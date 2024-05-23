import { useEffect } from "react";
import Car from "../models/Car.js";
import { Grid } from "@mui/material";
import DashboardDrawer from "../components/DashboardDrawer.jsx";
import AddCarForm from "../components/AddCarForm.jsx";
const DashboardAdmin = ()=>{

    useEffect(()=>{
        let tataPunch = Car(1,'Tata Punch','Micro-Suv',2021,34523,'Tata');
        console.log('Tata punch:- ',tataPunch);
    },[])

    return (
        <>
        <Grid>

        <DashboardDrawer />
        <AddCarForm />
        </Grid>
        </>
    )
}

export default DashboardAdmin;