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

export const selectBoardIdFromURL = (boardId) => {
    return {
        type: ACTION_TYPES.LOAD_BOARD_ID_FROM_URL,
        payload: boardId,
    };
};

export const updateBoardUsers = (users) => {
    return {
        type: ACTION_TYPES.UPDATE_BOARD_USERS,
        payload: users,
    };
};
