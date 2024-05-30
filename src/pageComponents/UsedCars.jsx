

import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import links from "../assets/util/links"
import CarCardComponent from "../components/carCardComponent"

const UsedCars = ()=>{
    const [usedCars,setUsedCars] = useState([])
    useEffect(()=>{
        let url = links.backendUrl + '/get-used-cars'
        fetch(url)
        .then(data=>{
            console.log('response',data)
            return data.json()
        })
        .then(carsData=>{
            console.log('cars:- ',carsData)
            setUsedCars(carsData.cars);
        })

    },[])

    return (
        <>
            {/* // all cars title */}

            <Grid container mt={3} mb={3} justifyContent={'center'}>
                <Grid item xs={8}>

                <Typography variant="h5">
                    Used Cars
                </Typography>
                </Grid>
                <Grid container justifyContent={'center'} xs={12} spacing={1} md={8}>
                    {usedCars.map((newCar)=>{
                        return (
                            <Grid item xs={11} md={4}>
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

export default UsedCars;