import { Button, Grid, Rating, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";
import { useEffect, useState } from "react";
import RatingBarComponent from "./RatingBarComponent";
import BasicModal from "./BasicModal";

const ReviewsComponent = () => {

  const [value,setValue] = useState(4);
  
  const [ratingPercentages,setRatingPercentages] = useState({})

  const [theVoteData,setTheVoteData] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const calculatePercentages = (data) => {
    const totalVotes = Object.values(data).reduce((sum, count) => sum + count, 0);
    const percentages = {};
  
    for (const rating in data) {
      percentages[rating] = (data[rating] / totalVotes) * 100;
    }
    return percentages;
  
  };
  useEffect(()=>{

    const voteData = {
      1: 3000, // 1 star votes
      2: 6000, // 2 star votes
      3: 6000, // 3 star votes
      4: 11000, // 4 star votes
      5: 8000, // 5 star votes
    };
    const percentages = calculatePercentages(voteData);
    setRatingPercentages(percentages)
    let myVoteData = Object.values(voteData)
    setTheVoteData(myVoteData)


  },[])

  
  
  // console.log('ratingPercentages:- ',ratingPercentages);
  // useEffect(()=>{

  // },[])

  // useEffect(()=>{

  // },[])

  return (
    <>
      {/* <div className={styles.scrollContainer}>
        <div className={styles.reviewCardWrapper}>
          {images.map((image, i) => (
            <img
              onClick={() => {
                handleImageChange(image);
              }}
              className={styles.image}
              key={i}
              src={links.backendUrl + "/" + image}
            />
          ))}
        </div>
      </div> */}

      <Grid container sx={{
        backgroundColor: myColors.myGrey,
        borderRadius: '25px'
      }} p={3} ml={'auto'} mr={'auto'} mb={'3.2em'} justifyContent={"center"} xs={11} md={10}>
        <Grid item xs={12}>
          <Typography variant={"h6"}>Reviews</Typography>
          <hr />
        </Grid>
        <Grid mt={2} container>
          <Grid item textAlign={'center'} xs={2}>
            <Typography variant="h2" color={"primary"}>
              4.0
            </Typography>
            <Rating name="read-only" size="small" value={value} readOnly />
            <Typography variant="body2" textAlign={'center'}>
              34k Review
            </Typography>
            </Grid>
            <Grid item xs={10}>
            {
              
              Object.keys(ratingPercentages).map((feild,i)=>{

                return (

                  <RatingBarComponent key={feild} feild={feild} numberOfVotes={theVoteData[i]}  percent={(ratingPercentages[feild])} />
                )

              })
            }

          </Grid>
        <Grid container >
          <Grid item pl={2} mt={3}>

            <Button color="primary" onClick={handleOpenModal} variant="contained">
              Post Review
            </Button>
            <BasicModal openModal={openModal} handleCloseModal={handleCloseModal} />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewsComponent;
