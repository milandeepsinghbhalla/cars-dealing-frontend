import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import links from "../assets/util/links"
import CarCardComponent from "../components/carCardComponent"

const NewCars = ()=>{
    const [newCars,setNewCars] = useState([])
    useEffect(()=>{
        let url = links.backendUrl + '/get-new-cars'
        fetch(url)
        .then(data=>{
            console.log('response',data)
            return data.json()
        })
        .then(carsData=>{
            console.log('cars:- ',carsData)
            setNewCars(carsData.cars);
        })

    },[])

    return (
        <>
            {/* // all cars title */}

            <Grid container mt={3} mb={3} justifyContent={'center'}>
                <Grid item xs={8}>

                <Typography mb={2} variant="h5">
                    New Cars
                </Typography>
                </Grid>
                <Grid container justifyContent={'center'}  xs={12} spacing={2} md={9}>
                    {newCars.map((newCar)=>{
                        return (
                            <Grid item xs={11} mb={2} md={4}>
                                <CarCardComponent car = {newCar} />
                            </Grid>
                        )
                    })}
                </Grid>

            </Grid>
            {/* // all cars card */}
        </>
    )
}

export default NewCars;