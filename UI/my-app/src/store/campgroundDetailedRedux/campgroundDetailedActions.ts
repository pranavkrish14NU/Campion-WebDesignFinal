// campgroundDetailedActions.ts
import {
  GET_CAMPGROUND_DETAILED,
  DELETE_CAMPGROUND,
  RESET_CAMPGROUND_DETAILED,
} from "./campgroundDetailedActionTypes";
import { Campground } from "../../components/CampgroundDetailed/CampgroundDetailed";

export interface CampgroundDetailedState {
  campground: Campground | null;
  isReviewDeleted: boolean; // Add this property
}

export const getCampgroundDetailed = (campground: Campground) => ({
  type: GET_CAMPGROUND_DETAILED,
  payload: campground,
});

export const deleteCampgroundAction = () => ({
  type: DELETE_CAMPGROUND,
});

export const resetCampgroundDetailed = () => ({
  type: RESET_CAMPGROUND_DETAILED,
});