// campgroundDetailedReducer.ts
import {
    GET_CAMPGROUND_DETAILED,
    DELETE_CAMPGROUND,
    RESET_CAMPGROUND_DETAILED,
  } from "./campgroundDetailedActionTypes";
  import { Campground } from "../../components/CampgroundDetailed/CampgroundDetailed";
  
  interface CampgroundDetailedState {
    campground: Campground | null;
    isReviewDeleted: boolean; // Add this property
  }
  
  interface Action<T, P> {
    readonly type: T;
    readonly payload?: P;
  }
  
  const initialState: CampgroundDetailedState = {
    campground: null,
    isReviewDeleted: false, // Initialize isReviewDeleted
  };
  
  const campgroundDetailedReducer = (
    state = initialState,
    action: Action<string, any>
  ) => {
    switch (action.type) {
      case GET_CAMPGROUND_DETAILED:
        return {
          ...state,
          campground: action.payload,
        };
      case DELETE_CAMPGROUND:
        return {
          ...state,
          isReviewDeleted: true,
        };
      case RESET_CAMPGROUND_DETAILED:
        return initialState;
      default:
        return state;
    }
  };
  
  export default campgroundDetailedReducer;