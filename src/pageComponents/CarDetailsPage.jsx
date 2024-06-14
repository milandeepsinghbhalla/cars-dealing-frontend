import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import carTestImage from "../assets/images/car-home-bg-3.jpeg";
import { useParams } from "react-router-dom";
import links from "../assets/util/links";
import CustomizedTable from "../components/CustomizedTable";
import ScrollingImageComponent from "../components/ScrollingImageComponent";
import ReviewsComponent from "../components/ReviewsComponent";
const CarDetailsPage = (props) => {
  // const [images, setImages] = useState([]);
  const imageStyles = {};
  // useEffect to get params
  const params = useParams();
  const [carInfo, setCarInfo] = useState(null);
  // const [loadingData, setLoadingData] = useState(true);
  const [rows, setRows] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  let carId = params.carId;
  // let myRows = [];
  useEffect(() => {
    // const asyncGetCarFn = async () => {
      try {
       
  
        const carResult = fetch(links.backendUrl + "/get-car", {
          method: "POST",
          body: JSON.stringify({ carId: carId }),
          headers: { "Content-Type": "application/json" },
        }).then((carResult)=>{

          if (carResult.status < 200 || carResult.status > 299) {
            // alert("error while geting car info..!!");
            let newError = { message: 'error while getting car'}
            throw newError;
          }
          return carResult.json()
        })
        .then((finalcarInfoResult)=>{

          // let finalcarInfoResult = await carResult.json();
          console.log("car info:-", finalcarInfoResult.car);
          setCarInfo(finalcarInfoResult.car);
          let myRows = [
            {name: finalcarInfoResult.car.name},
            {price: finalcarInfoResult.car.price},
            {carType: finalcarInfoResult.car.carType},
            {color: finalcarInfoResult.car.color},
            {seatingCapacity: finalcarInfoResult.car.seatingCapacity},
            {model: finalcarInfoResult.car.year}
          ]
          setRows(myRows);
          setCurrentImage(finalcarInfoResult.car.images[0])
        })
        // setLoadingData(false);
      } catch (err) {
        console.log("err:-", err);
      }
    
    
  }, []);

  const headCols = ["Specification Type", "Value"];
  // if(carInfo){
  //   // setTimeout(()=>{},1000)
   
  // }

  const handleImageChange = (image) => {
    setCurrentImage(image);
  };

  return (
    <>

    {carInfo && 

      <Grid
        container
        sx={{
          justifyContent: {
            xs: "center",
            md: "start",
          },
        }}
        spacing={2}
        p={3}
      >
        <Grid item my={3.2} xs={11} md={7}>
           
            <>
              <img
                style={{
                  height: "23em",
                  width: "100%",
                  borderRadius: "25px",
                }}
                src={links.backendUrl + "/" + currentImage}
              ></img>

              <Grid container>
                <ScrollingImageComponent
                  handleImageChange={handleImageChange}
                  images={carInfo.images}
                />
              </Grid>
            </>
          
        </Grid>
        <Grid item my={3.2} xs={11} md={5}>
          
                      <CustomizedTable headerCols={headCols} rows={rows} />
          
        </Grid>
      </Grid>
    }
    <ReviewsComponent />
    </>
  );
};

export default CarDetailsPage;
