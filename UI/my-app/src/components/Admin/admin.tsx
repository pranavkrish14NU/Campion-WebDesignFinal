import React, { useEffect, useState } from 'react';
import { fetchCampgrounds } from '../../api/campgroundsapi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCampground } from '../../api/deleteCampground';
import { FiFilter } from 'react-icons/fi'; // Import the filter icon
import CampgroundPriceChart from './CampgroundPriceChart';
import CampgroundLocationsChart from './CampgroundLocationsChart';
import '../../dist/admin.css';
import BookingTrendsChart from './BookingTrendsChart';
import { RiAdminFill } from "react-icons/ri";
import { FaCampground } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
import Modal from 'react-modal';

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  review: string;
  reviews: string[];
  date: string;
  imageUrl: string;
  booking: string[];
}

interface IParams {
  id: string;
}

const Campgrounds: React.FC = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [filteredCampgrounds, setFilteredCampgrounds] = useState<Campground[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [campgroundsPerPage] = useState<number>(5);
  const [sortCriteria, setSortCriteria] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { id } = useParams<IParams | any>();
  const [isDeleted, setIsDeleted] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCampgroundId, setDeleteCampgroundId] = useState<string | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCampgroundId, setEditCampgroundId] = useState<string | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campgroundData: Campground[] = await fetchCampgrounds();
        setCampgrounds(campgroundData);
        setFilteredCampgrounds(campgroundData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDeleted]);

  useEffect(() => {
    const filteredData = campgrounds
      .filter((campground) =>
        campground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campground.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campground.price.toString().includes(searchTerm)
      )
      .sort((a, b) => {
        const aValue = (a as any)[sortCriteria];
        const bValue = (b as any)[sortCriteria];

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
          return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }
      });

    setFilteredCampgrounds(filteredData);
  }, [searchTerm, campgrounds, sortCriteria, sortOrder]);

  const indexOfLastCampground = currentPage * campgroundsPerPage;
  const indexOfFirstCampground = indexOfLastCampground - campgroundsPerPage;
  const currentCampgrounds = filteredCampgrounds.slice(indexOfFirstCampground, indexOfLastCampground);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const exportToCSV = async () => {
    try {
      const allCampgrounds = await fetchCampgrounds();
      const csvData =
        'data:text/csv;charset=utf-8,' +
        'Name,Location,Price\n' +
        allCampgrounds
          .map((campground) => `${campground.name},${campground.location},${campground.price}`)
          .join('\n');

      const encodedUri = encodeURI(csvData);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'campgrounds_all.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  const handleEdit = async (campgroundId: string) => {
    navigate(`/admin/campgrounds/${campgroundId}/edit`);
    setEditCampgroundId(campgroundId);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (campgroundId: string) => {
  try {
    if (campgroundId) {
      setDeleteCampgroundId(campgroundId);
      setIsDeleteModalOpen(true);
      setIsDeleteSuccess(true); 
    } else {
      console.error('Campground ID is undefined');
    }
  } catch (error) {
    console.error('Error opening delete modal:', error);
  }
};

  

const handleConfirmDelete = async () => {
  try {
    if (deleteCampgroundId) {
      await deleteCampground(deleteCampgroundId);
      setIsDeleted(!isDeleted);
      setIsDeleteSuccess(true); 
    } else {
      console.error('Campground ID is undefined');
    }
  } catch (error) {
    console.error('Error deleting campground:', error);
  } finally {
    setDeleteCampgroundId(null);
    setIsDeleteModalOpen(false);
  }
};

  const handleOpenDeleteModal = (campgroundId: string) => {
    setDeleteCampgroundId(campgroundId);
    setIsDeleteModalOpen(true);
  };
  

  const handleCloseDeleteModal = () => {
    setDeleteCampgroundId(null);
    setIsDeleteModalOpen(false);
  };

  
  const handleFilterToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleApplyFilter = () => {
    const filteredData = campgrounds
      .filter((campground) =>
        campground.location.toLowerCase().includes(filterLocation.toLowerCase()) &&
        campground.price.toString().includes(filterPrice)
      )
      .sort((a, b) => {
        const aValue = (a as any)[sortCriteria];
        const bValue = (b as any)[sortCriteria];

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
          return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }
      });

    setFilteredCampgrounds(filteredData);
    setShowFilterModal(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h3>
          <RiAdminFill />
          <span>Admin</span>
        </h3>
        <p>
          <span className="header-span">Home</span> / Dashboard
        </p>
      </div>
      <div className="admin-top-container">
        <h4 className="admin-title">
          <div>
            All Campgrounds &nbsp; <FaCampground />
          </div>
          <button onClick={exportToCSV} className="export-button">
            Export As CSV
          </button>
        </h4>

        {showFilterModal && (
          <div className="filter-modal">
            <label htmlFor="filter-location">Location:</label>
            <input
              type="text"
              id="filter-location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />

            <label htmlFor="filter-price">Price:</label>
            <input
              type="text"
              id="filter-price"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            />

            <button onClick={handleApplyFilter}>Apply Filter</button>
          </div>
        )}

        <div className="table-container">
          <div className="search-box">
            {/* <label htmlFor="search">Search:</label> */}
            <div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleFilterToggle} className="filter-icon">
                <FiFilter />
              </button>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>Name</th>
                  <th onClick={() => handleSort("location")}>Location</th>
                  <th onClick={() => handleSort("price")}>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentCampgrounds.length > 0 && (
                  <>
                    {currentCampgrounds.map((campground) => (
                      <tr key={campground._id} className="admin-row">
                        <td className="admin-cell">
                          <Link
                            to={`/campgrounds/${campground._id}`}
                            className="admin-link"
                          >
                            {campground.name}
                          </Link>
                        </td>
                        <td className="admin-cell">{campground.location}</td>
                        <td className="admin-cell">
                          ${campground.price}/night
                        </td>
                        <td>
                          {/* Pass the campground ID to the handleEdit function */}
                          <button
                            className="admin-edit-button"
                            onClick={() => handleEdit(campground._id)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          {/* Pass the campground ID to the handleDelete function */}
                          <button
                            className="admin-delete-button"
                            onClick={() => handleOpenDeleteModal(campground._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        contentLabel="Delete Confirmation Modal"
        className="delete-modal"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this campground?</p>
        <button onClick={handleConfirmDelete} className="delete-button">
          Yes, Delete
        </button>
        <button onClick={handleCloseDeleteModal} className="cancel-button">
          Cancel
        </button>

        {isDeleteSuccess && (
          <div className="delete-success-message">
            Successfully deleted the campground!
          </div>
        )}
      </Modal>
          
          {/* Pagination */}
          <div className="pageination-container">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(
                  filteredCampgrounds.length / campgroundsPerPage
                ),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="graph-container">
        <div className="graph-header">
          <h4>
            <span>Insights</span>
            <MdInsights />
          </h4>
        </div>
        <div className="graphs">
          <div className="graph-left">
            <div className="graph">
              <h6>Booking Trends</h6>
              <BookingTrendsChart campgrounds={campgrounds} />
            </div>
            <div className="graph">
              <h6>Campground Type vs Avg Price</h6>
              <CampgroundPriceChart campgrounds={campgrounds} />
            </div>
          </div>
          <div className="graph-right">
            <div className="graph">
              <h6>Location vs No. of Campgrounds</h6>
              <CampgroundLocationsChart campgrounds={campgrounds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campgrounds;
