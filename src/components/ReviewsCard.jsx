import { Grid, Rating, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";

const ReviewsCard = ({ review }) => {
  function timeSinceInMonthsOrDays(timestamp) {
    // Create Date objects for the current time and the timestamp
    const now = new Date();
    const then = new Date(timestamp);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = now.getTime() - then.getTime();

    // Calculate the difference in days (with rounding)
    const daysAgo = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Handle edge cases and calculate months ago
    if (daysAgo >= 30) {
      const monthsAgo = Math.floor(daysAgo / 30); // Use floor for whole months
      return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
    } else {
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <>
      <Grid
        container
        p={4}
        mt={3}
        borderRadius={"25px"}
        sx={{
          backgroundColor: myColors.offWhite,
        }}
      >
        <Grid container xs={12}>
          <Grid item xs={11} md={4}>
            {`${review.reviewdBy.firstName} ${review.reviewdBy.lastName}`}
            <span
              style={{
                fontSize: "0.8em",
                fontWeight: "300",
                paddingLeft: "1.1em",
              }}
            >
              {timeSinceInMonthsOrDays(review.createdAt)}
            </span>
          </Grid>
          <Grid item textAlign={"end"} xs={11} md={4} ml={"auto"}>
            {/* <Typography component="legend">Read only</Typography> */}
            <Grid container justifyContent={'end'}>
              <Grid item pr={1}>{review.rating.toFixed(1)}</Grid>
              <Grid item>
                <Rating name="read-only" value={review.rating} readOnly />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container pl={3}>
              <Typography variant="body1">"{review.reviewText}"</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewsCard;
