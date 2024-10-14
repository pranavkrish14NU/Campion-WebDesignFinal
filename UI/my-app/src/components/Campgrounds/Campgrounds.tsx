import React, { useEffect, useState } from "react";
import { fetchCampgrounds } from "../../api/campgroundsapi";
import { Link, useParams } from "react-router-dom";
import "../../dist/Campgrounds.css";
import { useDispatch, useSelector } from "react-redux";
import { getCampgrounds } from "../../store/campgrounds/campgroundsActions";
import { stateType } from "../../store/rootReducer";
import {useTranslation} from 'react-i18next'

export interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}
 
interface IParams {
  id: string;
}
 
const Campgrounds: React.FC = () => {
  const {t} = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>(""); // 'asc' for ascending, 'desc' for descending
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<IParams | any>();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [isSuccessMessageModalOpen, setIsSuccessMessageModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCampgroundId, setEditCampgroundId] = useState<string | null>(null);

  const campgrounds = useSelector(
    (state: stateType) => state.campgrounds.campgrounds
  );
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const campgroundData = await fetchCampgrounds();
        dispatch(getCampgrounds(campgroundData));
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
        setError("Error fetching campgrounds. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, []);
 
  // Get unique locations from campgrounds
  const uniqueLocations = Array.from(
    new Set(campgrounds.map((campground) => campground.location))
  );
 
  const filteredCampgrounds = campgrounds
    .filter(
      (campground) =>
        campground.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterLocation === "" ||
          campground.location
            .toLowerCase()
            .includes(filterLocation.toLowerCase())) &&
        (campground.price.toString().includes(searchQuery) ||
          campground.price.toString().includes(filterLocation))
    )
    .sort((a, b) => {
      if (sortOption === "asc") {
        return a.price - b.price;
      } else if (sortOption === "desc") {
        return b.price - a.price;
      }
      return 0;
    });
 
  return (
    <div className="campground-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, location, or price"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      <div>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">{t('campgrounds.alllocations')}</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">{t('campgrounds.sortby')}</option>
          <option value="asc">{t('campgrounds.pricelth')}</option>
          <option value="desc">{t('campgrounds.pricehtl')}</option>
        </select>
      </div>
      </div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              {filteredCampgrounds.length > 0 ? (
                <div className="camp-card">
                  {filteredCampgrounds.map((campground) => (
                    <Link
                      key={campground._id}
                      className="viewcamp-button"
                      to={`${campground._id}`}
                    >
                      <div className="campground-box">
                        <img
                          src={campground.imageUrl}
                          alt={`Image for ${campground.name}`}
                        />
                        <div className="card-body">
                          <h3>{campground.name}</h3>
                          <p>{t('campgrounds.locations')} {campground.location}</p>
                          <p>${campground.price}{t('campgrounds.per-night')}</p>
                        </div>
                        <div className="card-footer"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No campgrounds found.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
 
export default Campgrounds;