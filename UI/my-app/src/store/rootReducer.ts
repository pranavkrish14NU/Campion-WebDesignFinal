import { combineReducers } from "redux";
import campgroundsReducer from "./campgrounds/campgroundsReducer";
 
//import bookingsReducer from "./bookings/bookingsReducer";
import campgroundDetailedReducer from "./campgroundDetailedRedux/campgroundDetailedReducer"; // Import the new reducer
import { Campground } from "../components/CampgroundDetailed/CampgroundDetailed";
//import reviewReducer from "./reviewsRedux/reviewReducer";
 
const rootReducer = combineReducers({
  campgrounds: campgroundsReducer,
  //bookings: bookingsReducer,
  campgroundDetailed: campgroundDetailedReducer, // Include the new reducer
  //reviews: reviewReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
 
export default rootReducer;
 
export interface stateType {
  campgrounds: {
    campgrounds: Campground[];
  };
  //bookings: { bookings: Booking[] };
}
 