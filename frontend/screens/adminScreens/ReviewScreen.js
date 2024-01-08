import React from "react";
import ReviewCard from "../../components/cards/ReviewCard";

const ReviewScreen = () => {
  return (
    <ReviewCard
      cardTitle={"Zein Shhadi"}
      cardDetail={"*" * 3}
      reviewText={"What A Ride ! Just what we needed to arrive on time !"}
    />
  );
};

export default ReviewScreen;
