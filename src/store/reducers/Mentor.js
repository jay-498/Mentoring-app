import {
  FETCH_COLLEGES_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
  FETCH_CURRENT_MENTOR_DETAILS_SUCCESS,
  FETCH_MENTOR_DETAILS_SUCCESS,
  UPDATE_MENTOR_EXPERIENCE_SUCCESS,
} from "../actionTypes/index";

const initialState = {
  companies: [],
  colleges: [],
  MentorDetails: {},
};

const MentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: [...action.payload],
      };

    case FETCH_COLLEGES_SUCCESS:
      return {
        ...state,
        colleges: [...action.payload],
      };

    case FETCH_MENTOR_DETAILS_SUCCESS:
      return {
        ...state,
        MentorDetails: { ...action.payload },
      };

    case FETCH_CURRENT_MENTOR_DETAILS_SUCCESS:
      return {
        ...state,
        MentorDetails: { ...action.payload },
      };

    case UPDATE_MENTOR_EXPERIENCE_SUCCESS:
      console.log("reducer", action.payload.data);
      return {
        ...state,
        MentorDetails: {
          ...state.MentorDetails,
          [action.payload.type]: [...action.payload.data],
        },
      };

    default:
      return state;
  }
};

export default MentorReducer;
