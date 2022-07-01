import {
  FETCH_COLLEGES_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
  FETCH_CURRENT_MENTOR_DETAILS_SUCCESS,
  FETCH_MENTOR_DETAILS_SUCCESS,
  FETCH_TAGS_SUCCESS,
  UPDATE_MENTOR_EXPERIENCE_SUCCESS,
  UPDATE_LOADER_STATE,
} from "../actionTypes/index";

const initialState = {
  companies: [],
  colleges: [],
  tags: [],
  MentorDetails: {},
  isLoading: false,
};

const MentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: [...action.payload],
      };

    case UPDATE_LOADER_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };

    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: [...action.payload],
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
      return {
        ...state,
        MentorDetails: {
          ...action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default MentorReducer;
