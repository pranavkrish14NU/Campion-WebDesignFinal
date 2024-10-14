import React, { useEffect, useState, useRef, FormEvent } from "react";
import Modal from "react-modal";
import { fetchCampgroundDetailed } from "../../api/campgrounddetailed";
import { Booking } from "../../api/bookingCampground";
import { useParams, useNavigate } from "react-router-dom";
import "../../dist/BookingCampground.css";
import StripeCheckout from "react-stripe-checkout";

interface BookingData {
  _id: string;
  startDate: string;
  endDate: string;
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
  booking: BookingData[];
}

const getDateWithoutTime = (date: Date) => {
  const dateString = date.toISOString().split("T")[0];
  return new Date(dateString);
};

const isDateRangeOverlap = (
  startDate: string,
  endDate: string,
  existingBookings: BookingData[]
) => {
  for (const booking of existingBookings) {
    const existingStartDate = booking.startDate;
    const existingEndDate = booking.endDate;

    if (
      (startDate >= existingStartDate && startDate <= existingEndDate) ||
      (endDate >= existingStartDate && endDate <= existingEndDate) ||
      (startDate <= existingStartDate && endDate >= existingEndDate)
    ) {
      return true; 
    }
  }

  return false; 
};

const BookingCampground: React.FC = () => {
  const { campgroundId } = useParams<{ campgroundId?: string }>();
  const navigate = useNavigate();
  const [campground, setCampground] = useState<Campground | null>(null);
  const [booking, setBookings] = useState<BookingData[]>([]);
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isBookingAvailable, setIsBookingAvailable] = useState(true);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [detailsEntered, setDetailsEntered] = useState(false);
  const [stripeCheckoutRendered, setStripeCheckoutRendered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (campgroundId) {
          const campgroundDetailedData = await fetchCampgroundDetailed(
            campgroundId
          );
          setCampground(campgroundDetailedData);
          setBookings(campgroundDetailedData.booking);
        } else {
          console.error("Campground ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching campground:", error);
      }
    };

    fetchData();
  }, [campgroundId]);

  const calculatePrice = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return numberOfDays * (campground?.price || 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkAvailabilityHandler = () => {
    const enteredStartDate = startDateInputRef.current!.value;
    const enteredEndDate = endDateInputRef.current!.value;
    setAvailabilityMessage(null);

    if (!enteredStartDate) {
      setStartDateError("*Start date is required");
      return;
    } else {
      setStartDateError(null);
    }

    if (!enteredEndDate) {
      setEndDateError("*End date is required");
      return;
    } else {
      setEndDateError(null);
    }

    const today = getDateWithoutTime(new Date());
    if (getDateWithoutTime(new Date(enteredStartDate)) < today) {
      setStartDateError(
        "*Start date should not be in the past or today's date"
      );
      return;
    } else {
      setStartDateError(null);
    }

    if (getDateWithoutTime(new Date(enteredEndDate)) < today) {
      setEndDateError("*End date should not be in the past or today's date");
      return;
    } else {
      setEndDateError(null);
    }

    if (
      getDateWithoutTime(new Date(enteredEndDate)) <
      getDateWithoutTime(new Date(enteredStartDate))
    ) {
      setEndDateError("*End date should be after the start date");
      return;
    } else {
      setEndDateError(null);
    }

    if (isDateRangeOverlap(enteredStartDate, enteredEndDate, booking)) {
      setAvailabilityMessage("*Campsite is not available on these dates");
      setIsBookingAvailable(false);
      setTotalAmount(0);
      return;
    } else {
      setAvailabilityMessage("*Campsite is available on these dates");
      setIsBookingAvailable(true);
      // Calculate and update the total amount
      const calculatedPrice = calculatePrice(enteredStartDate, enteredEndDate);
      setTotalAmount(calculatedPrice);
    }

    setAvailabilityChecked(true);
  };

  const performBooking = async () => {
    const enteredStartDate = startDateInputRef.current!.value;
    const enteredEndDate = endDateInputRef.current!.value;

    try {
      if (campground && campground._id) {
        const totalPrice = calculatePrice(enteredStartDate, enteredEndDate);

        const bookingData = {
          booking: {
            startDate: enteredStartDate,
            endDate: enteredEndDate,
          },
        };

        if (campgroundId) {
          const updatedCampground = await fetchCampgroundDetailed(campgroundId);
          setBookings(updatedCampground.booking);
        } else {
          console.error("Campground ID is undefined");
          return;
        }

        await Booking(campgroundId, bookingData);
        openModal();
      } else {
        console.error("Campground ID is undefined");
      }

      setDetailsEntered(true);
      setStripeCheckoutRendered(true);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  function onToken(token: { id: string; [otherProperties: string]: any }) {
    console.log(token);
    setDetailsEntered(true);
    performBooking();
  }

  return (
    <div>
      {campground ? (
        <div className="booking-page">
          <h1>Confirm Your Spot</h1>

          <div className="content-wrapper">
            <div className="left-content">
              <div>
                <p className="campname">{campground.name}</p>
                <img
                  className="campground-image_booking"
                  src={campground.imageUrl}
                  alt={`Image for ${campground.name}`}
                />
                <div>
                  <p style={{ textAlign: "left", marginLeft: "15px" }}>
                    Price: {`$${campground.price}/perNight`}
                  </p>
                  <p style={{ textAlign: "left", marginLeft: "15px" }}>
                    Location: {campground.location}
                  </p>
                  <p style={{ textAlign: "left", marginLeft: "15px" }}>
                    Type: {campground.type}
                  </p>
                </div>
              </div>
            </div>
            <div className="right-content">
              <form className="input_date">
                <div className="input_date_row">
                  <div>
                    <label htmlFor="startDate">Select Start Date</label>
                    <input
                      type="date"
                      required
                      id="startDate"
                      autoFocus={false}
                      ref={startDateInputRef}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    {startDateError && (
                      <p className="error-message" style={{ color: "#ff0000" }}>
                        {startDateError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="endDate">Select End Date</label>
                    <input
                      type="date"
                      required
                      id="endDate"
                      autoFocus={false}
                      ref={endDateInputRef}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    {endDateError && (
                      <p className="error-message" style={{ color: "#ff0000" }}>
                        {endDateError}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  {availabilityMessage && (
                    <p className="availability-message">
                      {availabilityMessage}
                    </p>
                  )}
                  <button
                    className="bookingbtn"
                    type="button"
                    onClick={checkAvailabilityHandler}
                  >
                    Check availability
                  </button>
                </div>
              </form>

              {availabilityChecked &&
                isBookingAvailable &&
                !stripeCheckoutRendered && (
                  <div className="stripe-checkout-container">
                    <h2>Complete Your Booking</h2>
                    <p>
                      Securely pay for your reservation using the Stripe
                      checkout:
                    </p>
                    <div>
                      <p className="totalprice">Total Price: ${totalAmount}</p>
                    </div>
                    <StripeCheckout
                      token={onToken}
                      amount={totalAmount * 100}
                      currency="USD"
                      stripeKey="pk_test_51OKEmqCurH8QVpBQNkLRFzsh8fOHL058hFBELRIFOHefh7onJSDDBnZtNWkt0t3vRlFSXmv0PX77q0hVs99gGbqV00eyCI32nc"
                    />
                  </div>
                )}
            </div>

            {detailsEntered && (
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Success Modal"
                className="booking-modal"
              >
                <div className="booking-success-content">
                  <h2>Booking Confirmed!</h2>
                  <p>
                    Your reservation for {campground?.name} has been
                    successfully booked.
                  </p>
                  <p style={{ textAlign: "center", fontSize: "22px" }}>
                    <strong>Details</strong>
                  </p>
                  <p>
                    <strong>Campground Name:</strong> {campground?.name}
                  </p>
                  <p>
                    <strong>Location:</strong> {campground?.location}
                  </p>
                  <p>
                    <strong>Dates:</strong> {startDateInputRef.current?.value}{" "}
                    to {endDateInputRef.current?.value}
                  </p>
                  <p>
                    Thank you for choosing our campground. We look forward to
                    hosting you!
                  </p>
                  <button
                    onClick={() => {
                      closeModal();
                      navigate(`/campgrounds`);
                    }}
                  >
                    Close
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ) : (
        <p className="loading_booking">Loading...</p>
      )}
    </div>
  );
};

export default BookingCampground;
