import React, { useEffect, useState } from "react";
import { fetchCampgroundDetailed } from "../../api/campgrounddetailed";
import { useParams, useNavigate } from "react-router-dom";
import { updateCampground } from "../../api/updateCampground";
import ReactModal from "react-modal";
import "../../dist/EditCampground.css";
import editcamp from "../../assets/editcamp.png";

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}

const EditCampground: React.FC = () => {
  const { campgroundId } = useParams<{ campgroundId?: string }>();
  const navigate = useNavigate();
  const [campground, setCampground] = useState<Campground | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isNoChangesModalOpen, setIsNoChangesModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (campgroundId) {
          const campgroundDetailedData = await fetchCampgroundDetailed(
            campgroundId
          );
          setCampground(campgroundDetailedData);
        } else {
          console.error("Campground ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching campground:", error);
      }
    };

    fetchData();
  }, [campgroundId]);

  const navigateBack = () => {
    navigate(`/campgrounds/${campgroundId}`);
  };
  const handleFieldChange = () => {
    // Set isModified to true when any field is changed
    setIsModified(true);
  };
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Starting handleUpdate...");
    try {
      // Clear previous validation errors
      setNameError(null);
      setLocationError(null);
      setDescriptionError(null);
      setPriceError(null);
      setImageUrlError(null);

      let hasError = false;

      // Validate each field separately
      if (!campground?.name) {
        setNameError("*Name must not be empty");
        hasError = true;
      }

      if (!campground?.location) {
        setLocationError("*Location must not be empty");
        hasError = true;
      }

      if (!campground?.description) {
        setDescriptionError("*Description must not be empty");
        hasError = true;
      }

      if (campground?.price === 0 || isNaN(campground?.price as number)) {
        setPriceError("*Price must be a valid number.");
        hasError = true;
      } else {
        setPriceError(null);
      }

      if (!campground?.imageUrl) {
        setImageUrlError("*Image URL must not be empty");
        hasError = true;
      }

      if (hasError) {
        return;
      }
      if (!isModified) {
        // If no field has been modified, show a pop-up or set an error message
        setIsNoChangesModalOpen(true);
        return;
      }
      // Ensure campground is not null before calling updateCampground
      if (campground) {
        await updateCampground(campground);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error updating campground:", error);
    }
  };
  const closeModalAndNavigate = () => {
    closeModal();
    navigate(`/campgrounds/${campgroundId}`);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsNoChangesModalOpen(false);
  };
  return (
    <div className="two-column-container">
      {campground ? (
        <>
          {" "}
          <div className="form-column">
            <form className="edit-campground-container">
              <h3>EDIT CAMPGROUND</h3>
              <div className="campground-details-edit">
                <p>ID: {campground._id}</p>

                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={campground.name}
                  onChange={(e) => {
                    setCampground({ ...campground, name: e.target.value });
                    setNameError(null);
                    handleFieldChange();
                  }}
                />
                {nameError && <p className="validation-error">{nameError}</p>}

                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  value={campground.location}
                  onChange={(e) => {
                    setCampground({ ...campground, location: e.target.value });
                    setLocationError(null);
                    handleFieldChange();
                  }}
                />
                {locationError && (
                  <p className="validation-error">{locationError}</p>
                )}

                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={campground.description}
                  onChange={(e) => {
                    setCampground({
                      ...campground,
                      description: e.target.value,
                    });
                    setDescriptionError(null);
                    handleFieldChange();
                  }}
                />
                {descriptionError && (
                  <p className="validation-error">{descriptionError}</p>
                )}

                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  value={campground.price}
                  onChange={(e) => {
                    setCampground({
                      ...campground,
                      price: Number(e.target.value),
                    });
                    setPriceError(null);
                    handleFieldChange();
                  }}
                />
                {priceError && <p className="validation-error">{priceError}</p>}

                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={campground.imageUrl}
                  onChange={(e) => {
                    setCampground((prevCampground) => ({
                      ...prevCampground!,
                      imageUrl: e.target.value,
                    }));
                    setImageUrlError(null);
                    handleFieldChange();
                  }}
                />
                {imageUrlError && (
                  <p className="validation-error">{imageUrlError}</p>
                )}
              </div>
              <div>
                <button className="backbutton" onClick={navigateBack}>
                  Back
                </button>
                <button className="editbutton" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="image-preview">
            <img src={editcamp} alt="Campground Preview" />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModalAndNavigate}
        contentLabel="Campground Updated Modal"
        className="edit-modal"
      >
        <h3>Campground Updated Successfully!</h3>
        <button onClick={closeModalAndNavigate}>Close</button>
      </ReactModal>
      <ReactModal
        isOpen={isNoChangesModalOpen}
        onRequestClose={closeModal}
        contentLabel="No Changes Made Modal"
        className="edit-modal"
      >
        <h3 className="highlightmsg" style={{ color: "red" }}>
          No changes made. Update any field to proceed.
        </h3>
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
};

export default EditCampground;
