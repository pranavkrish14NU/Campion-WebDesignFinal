import Campgrounds, {
    Campground,
  } from "../../components/Campgrounds/Campgrounds";
  import { GET_CAMPGROUNDS, ADD_CAMPGROUNDS } from "./campgroundsActionTypes";
  
  interface stateType {
    campgrounds: Campground[];
  }
  
  interface Action<T, P> {
    readonly type: T;
    readonly payload?: P;
  }
  
  const initialState: stateType = {
    campgrounds: [],
  };
  
  const campgroundsReducer = (
    state = initialState,
    action: Action<string, any>
  ) => {
    switch (action.type) {
      case GET_CAMPGROUNDS:
        return {
          ...state,
          campgrounds: action.payload,
        };
      case ADD_CAMPGROUNDS:
        const current = state.campgrounds;
        return { campgrounds: current.push(action.payload) };
      default:
        return state;
    }
  };
  
  export default campgroundsReducer;
  