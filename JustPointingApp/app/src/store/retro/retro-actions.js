import * as ACTION_TYPES from "./retro-action-types";

export const getRetroData = (retroData) => {
  return {
    type: ACTION_TYPES.GET_RETRO_DATA,
    payload: retroData,
  };
};
