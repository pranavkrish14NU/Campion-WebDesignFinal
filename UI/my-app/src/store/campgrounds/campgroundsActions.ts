import { GET_CAMPGROUNDS, ADD_CAMPGROUNDS } from "./campgroundsActionTypes";
import { Campground } from "../../components/Campgrounds/Campgrounds";
 
export const getCampgrounds = (campgrounds: Campground[]) => {
  return { type: GET_CAMPGROUNDS, payload: campgrounds };
};
 
export const addCampgrounds = (campground: Campground) => {
  return { type: ADD_CAMPGROUNDS, payload: campground };
};