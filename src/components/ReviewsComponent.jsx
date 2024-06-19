import { Button, Grid, Pagination, Rating, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";
import { useEffect, useState } from "react";
import RatingBarComponent from "./RatingBarComponent";
import BasicModal from "./BasicModal";
import links from "../assets/util/links";
import ReviewsCard from "./ReviewsCard";
import { useParams } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const ReviewsComponent = () => {
  const [value, setValue] = useState(4);

  const [ratingPercentages, setRatingPercentages] = useState({});

  const [theVoteData, setTheVoteData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [totalVotes, setTotalVotes] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [filterOptions, setFilterOptions] = useState([
    {
      name: "1 star",
      fn: () => {
        // filter to show only 1 star reviews
      },
    },
    {
      name: "2 star",
      fn: () => {},
    },
    {
      name: "3 star",
      fn: () => {},
    },
    {
      name: "4 star",
      fn: () => {},
    },
    {
      name: "5 star",
      fn: () => {},
    },
  ]);
  const params = useParams();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // let totalRating

  const calculatePercentages = (data) => {
    const totalVotes = Object.values(data).reduce(
      (sum, count) => sum + count,
      0
    );
    let powerMap = Object.keys(data).map((key) => {
      return data[key] * key;
    });
    let totalPower = powerMap.reduce((acc, currentElement) => {
      return acc + currentElement;
    }, 0);
    let totalRatingPower = (totalPower / totalVotes).toFixed(1);
    setTotalRating(totalRatingPower);

    setTotalVotes(totalVotes);

    const percentages = {};

    for (const rating in data) {
      percentages[rating] = (data[rating] / totalVotes) * 70;
    }
    return percentages;
  };
  useEffect(() => {
    // const voteData = {
    //   1: 3000, // 1 star votes
    //   2: 6000, // 2 star votes
    //   3: 6000, // 3 star votes
    //   4: 11000, // 4 star votes
    //   5: 8000, // 5 star votes
    // };
    fetch(links.backendUrl + "/get-reviewBarData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: params.carId,
      }),
    })
      .then((resultStatus) => {
        if (resultStatus.status < 200 || resultStatus.status > 299) {
          resultStatus.json().then((err) => {
            console.log("err rating bar data:-", err);
            alert(err.message);
          });
        }
        return resultStatus.json();
      })
      .then((result) => {
        // setReviewsResult(result.allReviews);
        const percentages = calculatePercentages(result.allReviews);
        setRatingPercentages(percentages);
        let myVoteData = Object.values(result.allReviews);
        setTheVoteData(myVoteData);
      });

    fetch(links.backendUrl + "/get-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: params.carId,
        page,
      }),
    })
      .then((result) => {
        if (result.status < 200 || result.status > 299) {
          result.json().then((err) => {
            console.log("err:- ", err);
            alert(err.messaage);
          });
        }
        return result.json();
      })
      .then((reviewsResult) => {
        console.log("reviews result:-", reviewsResult);
        setReviews(reviewsResult.reviews);
        setCount(reviewsResult.count);
      })
      .catch((err) => {
        console.log("last error:- ", err);
      });
  }, []);

  // console.log('ratingPercentages:- ',ratingPercentages);
  // useEffect(()=>{

  // },[])

  // useEffect(()=>{

  // },[])

  const handleChange = (event, value) => {
    // make request to fetch data
    setPage(value);
    fetch(links.backendUrl + "/get-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: params.carId,
        page: value,
      }),
    })
      .then((result) => {
        if (result.status < 200 || result.status > 299) {
          result.json().then((err) => {
            console.log("err:- ", err);
            alert(err.messaage);
          });
        }
        return result.json();
      })
      .then((reviewsResult) => {
        console.log("reviews result:-", reviewsResult);
        setReviews(reviewsResult.reviews);
        // setCount(count)
      })
      .catch((err) => {
        console.log("last error:- ", err);
      });

    //
  };

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

      <Grid
        container
        sx={{
          backgroundColor: myColors.myGrey,
          borderRadius: "25px",
        }}
        p={3}
        ml={"auto"}
        mr={"auto"}
        mb={"3.2em"}
        justifyContent={"center"}
        xs={11}
        md={10}
      >
        <Grid item xs={12}>
          <Typography variant={"h6"}>Reviews</Typography>
          <hr />
        </Grid>
        <Grid mt={2} container justifyContent={'center'}>
          <Grid item textAlign={"center"} xs={10} md={2}>
            <Typography variant="h2" color={"primary"}>
              {totalRating}
            </Typography>
            <Rating name="read-only" size="small" value={totalRating} precision={0.5} readOnly />
            <Typography variant="body2" textAlign={"center"}>
              {totalVotes} Reviews
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}>
            {Object.keys(ratingPercentages).map((feild, i) => {
              return (
                <RatingBarComponent
                  key={feild}
                  feild={feild}
                  numberOfVotes={theVoteData[i]}
                  percent={ratingPercentages[feild]}
                />
              );
            })}
          </Grid>
          <Grid container>
            <Grid item pl={2} mt={3}>
              <Button
                color="primary"
                onClick={handleOpenModal}
                variant="contained"
              >
                Post Review
              </Button>
              <BasicModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
              />
            </Grid>
            <Grid item pl={2} mt={3}>
              <DropdownMenu title={"Filters"} options={filterOptions} />
            </Grid>
          </Grid>
        </Grid>
        {reviews.length > 0 &&
          reviews.map((review) => {
            return <ReviewsCard review={review} />;
          })}

        <Grid container mt={3} justifyContent={"center"} xs={11} md={10}>
          <Pagination
            count={count}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewsComponent;
