// Campgrounds.tsx
import React, { useEffect, useState } from "react";
import { fetchCampgroundDetailed } from "../../api/campgrounddetailed";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import the star icon
import "../../dist/CampgroundDetailed.css";
import ReviewRating from "../ReviewRating/ReviewRating";
import { deleteCampground } from "../../api/deleteCampground";
import BookingCampground from "../BookingCampground/BookingCampground";
import { Link } from "react-router-dom";
import { useAuth } from "../CurrentUser";
import MapComponent from '../Maps/MapComponent';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { deleteCampgroundAction, getCampgroundDetailed, resetCampgroundDetailed } from "../../store/campgroundDetailedRedux/campgroundDetailedActions";
import Modal from 'react-modal';
import {useTranslation} from 'react-i18next'

 
 
 
export interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: Review[];
  booking: [];
  author: {
    _id: string;
    username: String;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}
 
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
}
 
const Campgrounds: React.FC = () => {
  const {t} = useTranslation('common');
  const [isReviewDeleted, setIsReviewDeleted] = useState(false);
  const { currentUser } = useAuth();
  const { campgroundId } = useParams<{ campgroundId?: string }>();
  const dispatch = useDispatch();
  const campground = useSelector((state: RootState) => state.campgroundDetailed.campground);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [isSuccessMessageModalOpen, setIsSuccessMessageModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (campgroundId) {
          const campgroundDetailedData = await fetchCampgroundDetailed(campgroundId);
          dispatch(getCampgroundDetailed(campgroundDetailedData));
        } else {
          console.error("Campground ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching campground:", error);
      }
    };
  
    fetchData();
  }, [dispatch, campgroundId, isReviewDeleted]);
  const handleDelete = async () => {
    try {
      if (campground && campground._id) {
        setIsModalOpen(true); // Open the confirmation modal
      } else {
        console.error("Campground ID is undefined");
      }
    } catch (error) {
      console.error("Error deleting campground:", error);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      if (campground && campground._id) {
        await deleteCampground(campground._id);
        dispatch(deleteCampgroundAction());
        setIsSuccessMessageModalOpen(true); // Open the success message modal
      } else {
        console.error("Campground ID is undefined");
      }
    } catch (error) {
      console.error("Error deleting campground:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccessMessageModalOpen(false);
    navigate(`/campgrounds/${campgroundId}`);
  };
  const handleCloseModalaftersuccess = () => {
    setIsModalOpen(false);
    setIsSuccessMessageModalOpen(false);
    navigate(`/campgrounds`);
  };
  const fetchCampgroundDataAfterSumbitReview = async() => {
    try {
      if (campgroundId) {
        const campgroundDetailedData = await fetchCampgroundDetailed(campgroundId);
        dispatch(getCampgroundDetailed(campgroundDetailedData));
      } else {
        console.error("Campground ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching campground:", error);
    }
  }
 
  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) {
      return 0; 
    }
 
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
 
    return averageRating;
  };
 
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />);
    }
    return stars;
  };
 
  if (campground && campground.author) {
    console.log("author ---- " + campground.author._id);
    console.log(
      "campground.author:",
      JSON.stringify(campground.author, null, 2)
    );
  } else {
    console.log("campground or author is null");
  }
 
  if (currentUser) {
    console.log(
      "current user id --=-=-=-=-=-==- " +
        JSON.stringify(currentUser._id, null, 2)
    );
  } else {
    console.log("currentUser or id is null");
  }
 
  return (
    <div>
      {campground ? (
        <>
          <div className="campgrounds-container">
            <div className="campground-container">
              <img
                className="campground-image"
                src={campground.imageUrl}
                alt={`Image for ${campground.name}`}
              />
              <div>
              <div className="Star-rating">
                <h3>{campground.name}</h3>

                <div className="average-rating">
                {t('campgrounds.detailed.rating')} &nbsp; {calculateAverageRating(campground.reviews).toFixed(1)}
                  <div>{renderStarRating(calculateAverageRating(campground.reviews))}</div>
                </div>  
                </div> 
                <p className="campground-details">{campground.description}</p>
                <p className="campground-details">
                  <b>{t('campgrounds.locations')} </b>
                  {campground.location}
                </p>
                <p className="campground-details">
                  ${campground.price} {t('campgrounds.per-night')}
                </p>
                {currentUser &&
                  campground.author &&
                  campground.author._id === currentUser._id && (
                    <button onClick={handleDelete} className="delete-button">
                      {t('delete.button')}
                    </button>
                  )}
                  {currentUser &&
            campground.author &&
            campground.author._id === currentUser._id && (
              <Link to={`/campgrounds/${campground._id}/edit`}>
                <button className="edit-button">{t('edit.button')}</button>
              </Link>
            )}
                {currentUser && (
                  <Link
                    className="viewcamp-button"
                    to={`/campgrounds/${campgroundId}/booking`}
                  >
                    <button className="booking-button">{t('book.button')}</button>
                  </Link>
                )}
              </div>
            </div>
            <div className="campground-details-container">
              <div className="map-container">
                {campground.geometry && campground.geometry.coordinates ? (
                  <MapComponent
                    coordinates={campground.geometry.coordinates}
                    style={{ height: '225px', width: '118%' }}
                  />
                ) : (
                  <p className="loading">Loading Map...</p>
                )}
              </div>
              <ReviewRating
                campgroundId={campgroundId || ""}
                reviews={campground.reviews || []}
                isReviewDeleted={isReviewDeleted}
                setIsReviewDeleted={setIsReviewDeleted}
                fetchCampgroundDataAfterSumbitReview={fetchCampgroundDataAfterSumbitReview}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}

<Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Delete Confirmation Modal"
        className="delete-modal"
      >
        <h2>{t('confirm.deletion')}</h2>
        <p>{t('confirm.deletion.message')}</p>
        <button onClick={handleConfirmDelete} className="delete-button">{t('delete.yes')}</button>
  <button onClick={handleCloseModal} className="cancel-button">{t('delete.cancel')}</button>

      </Modal>
       <Modal
            isOpen={isSuccessMessageModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Success Message Modal"
            className="success-message-modal-delete"
          >
            <h2>{t('confirm.deletion.success')}</h2>
            <p>{t('confirm.deletion1.message')}</p>
            <button onClick={handleCloseModalaftersuccess}>Close</button>
          </Modal>     
    </div>
  );
  
};
 
export default Campgrounds;