import * as ACTION_TYPES from "./retro-action-types";

export const initialRetroData = {
    retroBoards: [],
    retroData: [],
    selectedBoard: {},
};

export const RetroReducer = (state = initialRetroData, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_RETRO_DATA:
            return {
                ...state,
                retroData: action.payload,
            };
        case ACTION_TYPES.GET_RETRO_BOARDS:
            return {
                ...state,
                retroBoards: action.payload,
            };
        case ACTION_TYPES.SELECT_BOARD:
            return {
                ...state,
                selectedBoard: action.payload,
            };
        default:
            return state;
    }
};
