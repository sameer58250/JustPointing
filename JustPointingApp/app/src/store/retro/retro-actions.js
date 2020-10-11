import * as ACTION_TYPES from "./retro-action-types";

export const getRetroData = (retroData) => {
    return {
        type: ACTION_TYPES.GET_RETRO_DATA,
        payload: retroData,
    };
};

export const getRetroBoards = (boards) => {
    return {
        type: ACTION_TYPES.GET_RETRO_BOARDS,
        payload: boards,
    };
};

export const selectRetroBoard = (board) => {
    return {
        type: ACTION_TYPES.SELECT_BOARD,
        payload: board,
    };
};
