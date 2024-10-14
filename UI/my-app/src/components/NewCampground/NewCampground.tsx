import React, { useRef, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { postCampground } from "../../api/newcampgroundapi";
import styles from "../../dist/NewCampground.module.css";
import newcamp from "../../assets/newcampground.png";

interface NewCampgroundProps {
  onAddCampground: (campgroundData: {
    name: string;
    location: string;
    type: string;
    description: string;
    price: number;
    imageUrl: string;
  }) => void;
}

const NewCampground: React.FC<NewCampgroundProps> = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const typeInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [type, setType] = useState<string>("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    let hasError = false;

    // Validate each field separately
    if (!nameInputRef.current!.value.trim()) {
      setNameError("*Campground title must not be empty");
      hasError = true;
    }

    if (!locationInputRef.current!.value.trim()) {
      setLocationError("*Location must not be empty");
      hasError = true;
    }

    if (!descriptionInputRef.current!.value.trim()) {
      setDescriptionError("*Description must not be empty");
      hasError = true;
    }

    const price = parseFloat(priceInputRef.current!.value);
    if (isNaN(price) || price <= 0) {
      setPriceError("*Price must be a valid number greater than 0");
      hasError = true;
    }

    if (!urlInputRef.current!.value.trim()) {
      setUrlError("*Image URL must not be empty");
      hasError = true;
    }
    console.log("Validation result:", !hasError);
    return !hasError;
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const enteredName = nameInputRef.current!.value;
    const enteredLocation = locationInputRef.current!.value;
    const enteredType = type;
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredPrice = parseFloat(priceInputRef.current!.value);
    const enteredUrl = urlInputRef.current!.value;

    const campgroundData = {
      name: enteredName,
      location: enteredLocation,
      type: enteredType,
      description: enteredDescription,
      price: enteredPrice,
      imageUrl: enteredUrl,
    };

    try {
      // Send data to the server using the postCampground function
      const status = await postCampground(campgroundData);

      if (status === 201 || status === 200) {
        // Call the onAddCampground prop to update the state in the parent component
        props.onAddCampground(campgroundData);

        // Clear the form fields
        nameInputRef.current!.value = "";
        locationInputRef.current!.value = "";
        descriptionInputRef.current!.value = "";
        priceInputRef.current!.value = "";
        urlInputRef.current!.value = "";

        console.log("Campground added successfully!");
        setNameError(null);
        setLocationError(null);
        setTypeError(null);
        setDescriptionError(null);
        setPriceError(null);
        setUrlError(null);
        setIsModalOpen(true);
      } else {
        console.error("Error adding campground to the database.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["two-column-container"]}>
      <div className={styles["form-column"]}>
        <form className={styles["campground-form"]} onSubmit={submitHandler}>
          <h3>REGISTER YOUR CAMP</h3>
          <div>
            <label htmlFor="title">Campground Title</label>
            <input type="text" required id="title" ref={nameInputRef} />
            {nameError && (
              <p className={styles["validation-error-new"]}>{nameError}</p>
            )}
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input type="text" required id="location" ref={locationInputRef} />
            {locationError && (
              <p className={styles["validation-error-new"]}>{locationError}</p>
            )}
          </div>
          <div className={styles["custom-select-container"]}>
            <label htmlFor="type" className={styles["custom-select-label"]}>
              Type
            </label>
            <select
              id="type"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "7px",
                height: "40px",
                backgroundColor: "white",
              }}
              className={`${styles["custom-select"]} ${styles["custom-dropdown"]}`}
            >
              <option value="">Select Type</option>
              <option value="Tent">Tent</option>
              <option value="Cabin">Cabin</option>
              <option value="RV">RV</option>
            </select>
            {typeError && (
              <p className={styles["validation-error-new"]}>{typeError}</p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows={5}
              ref={descriptionInputRef}
            ></textarea>
            {descriptionError && (
              <p className={styles["validation-error-new"]}>
                {descriptionError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" required id="price" ref={priceInputRef} />
            {priceError && (
              <p className={styles["validation-error-new"]}>{priceError}</p>
            )}
          </div>

          <div>
            <label htmlFor="url">Image</label>
            <input type="url" required id="url" ref={urlInputRef} />
            {urlError && (
              <p className={styles["validation-error-new"]}>{urlError}</p>
            )}
          </div>
          <div>
            <button className="button-add" type="submit">
              Add Campground
            </button>
          </div>
        </form>
      </div>
      <div className={styles["image-column"]}>
        <img
          src={newcamp}
          alt="Campground Preview"
          className={styles["campground-image-new"]}
        />
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Campground Added Modal"
        className={styles["success-modal"]}
      >
        <h3>Campground Added Successfully!</h3>
        <button
          onClick={() => {
            closeModal();
            navigate(`/campgrounds`);
          }}
        >
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default NewCampground;
