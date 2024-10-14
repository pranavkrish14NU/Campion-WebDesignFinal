import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { submitReview } from "../../api/submitReview";
import { deleteReview } from "../../api/deleteReview";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../CurrentUser";
import "../../dist/ReviewRating.css";

interface Review {
  _id: string;
  body: string;
  rating: number;
  author: {
    _id: String;
  };
}

interface ReviewRatingProps {
  campgroundId: string;
  reviews: Review[];
  isReviewDeleted: Boolean;
  setIsReviewDeleted: any;

  fetchCampgroundDataAfterSumbitReview: () => Promise<void>;
}

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: [];
  booking: [];
}

const ReviewRating: React.FC<ReviewRatingProps> = ({
  campgroundId,
  reviews,
  isReviewDeleted,
  setIsReviewDeleted,
  fetchCampgroundDataAfterSumbitReview,
}) => {
  const [userRating, setUserRating] = useState<number>(1);
  const [reviewText, setReviewText] = useState<string>("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    handleRatingChange(userRating);
  }, [userRating]);

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <div key={i} onClick={() => handleRatingChange(i + 1)}>
          <FaStar color={i < rating ? "#ffc107" : "#e4e5e9"} />
        </div>
      );
    }
    return stars;
  };

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = async () => {
    if (reviewText.trim() !== "") {
      const reviewData = {
        review: {
          body: reviewText,
          rating: userRating,
        },
      };

      const result = await submitReview(campgroundId, reviewData);

      if (result.success) {
        console.log("Review submitted successfully!");
        setUserRating(1);
        setReviewText("");
        // Reload the page
        fetchCampgroundDataAfterSumbitReview()
        //  window.location.reload();
      } else {
        console.error("Failed to submit review. Error:", result.error);
      }
    } else {
      console.log("Please provide both rating and review text.");
    }
  };

  // const renderStar = (rating: number) => {
  //   const stars = [];
  //   for (let i = 0; i < 5; i++) {
  //     stars.push(<FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />);
  //   }
  //   return stars;
  // };

  const handleDeleteReview = async (campgroundId: string, reviewId: string) => {
    try {
      if (reviewId) {
        await deleteReview(campgroundId, reviewId);
        setIsReviewDeleted(!isReviewDeleted);
        console.log("Review deleted successfully!");
      } else {
        console.error("Review ID is undefined");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="review-section">
      <p className="review-heading">Leave a review</p>
      <div className="star-rating">{renderStarRating(userRating)}</div>
      <p className="bold-text">Your Rating: {userRating}/5</p>
      <div className="review-input">
        <textarea
          placeholder="Write your review here..."
          rows={3}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        {currentUser && (
        <button type="button" onClick={handleSubmitReview}>
          Submit
        </button>
                  )}
      </div>

      {/* Display average rating in the top right corner */}
     

      <div className="all-reviews">
        <h5>All Reviews</h5>
        {reviews.length > 4? (
          <div className="scrollable-reviews">
            {reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-box">
                  <p className="bold-text">Rating: {review.rating}</p>

                  {/* Display the review author's ID
            <p className="bold-text">Author ID: {}</p> */}

                  {currentUser &&
                    review.author &&
                    review.author._id === currentUser._id && (
                      <div className="delete-icon">
                        <MdDelete
                          onClick={() =>
                            handleDeleteReview(campgroundId, review._id)
                          }
                        />
                      </div>
                    )}
                </div>
                <p>{review.body}</p>
              </div>
            ))}
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-box">
                <p className="bold-text">Rating: {review.rating}/5</p>

                {/* Display the review author's ID
          <p className="bold-text">Author ID: {review.author._id}</p> */}

                {currentUser &&
                  review.author &&
                  review.author._id === currentUser._id && (
                    <div className="delete-icon">
                      <MdDelete
                        onClick={() =>
                          handleDeleteReview(campgroundId, review._id)
                        }
                      />
                    </div>
                  )}
              </div>
              <p>{review.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewRating;
