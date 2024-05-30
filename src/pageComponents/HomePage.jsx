import { useWindowWidth } from "@react-hook/window-size";
import Jumbotron from "../components/Jumbotron";
import JumbotronMobile from "../components/JumbotronMobile";
import { Grid } from "@mui/material";
// import { useEffect } from "react";
// import useDeviceWidth from "../customHooks/useDeviceWidth";

// import { Outlet } from "react-router-dom";
const HomePage = ()=>{

    const width  = useWindowWidth() ;


    return (
        <>
            {/* <header>
                <Outlet />
            </header> */}
            <Grid container>

            <section>
                {
                    width<=768?<JumbotronMobile />: <Jumbotron />
                }
                
            </section>
            <Grid container height={'120vh'}>

            </Grid>
            </Grid>
        </>
    )
}

export default HomePage;