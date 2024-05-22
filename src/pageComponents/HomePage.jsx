import { useWindowWidth } from "@react-hook/window-size";
import Jumbotron from "../components/Jumbotron";
import JumbotronMobile from "../components/JumbotronMobile";
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
            <section>
                {
                    width<=768?<JumbotronMobile />: <Jumbotron />
                }
                
            </section>
        </>
    )
}

export default HomePage;