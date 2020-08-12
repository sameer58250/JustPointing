import * as ACTION_TYPES from "./retro-action-types";

export const initialRetroData = {
  retroData: [],
};

export const RetroReducer = (state = initialRetroData, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_RETRO_DATA:
      return {
        ...state,
        retroData: action.payload,
      };
    default:
      return state;
  }
};
