import * as ACTION_TYPES from "./retro-action-types";

export const initialRetroData = {
    retroBoards: [],
    retroData: [],
    selectedBoard: {},
    selectedBoardId: "",
    selectedBoardUsers: [],
    selectedRetroPoint: {},
    isRetroPointModalOpen: false,
    isSettingsOpen: false,
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
                isRetroPointModalOpen: false,
            };
        case ACTION_TYPES.LOAD_BOARD_ID_FROM_URL:
            return {
                ...state,
                selectedBoardId: action.payload,
            };
        case ACTION_TYPES.UPDATE_BOARD_USERS:
            return {
                ...state,
                selectedBoardUsers: action.payload,
            };
        case ACTION_TYPES.SELECT_RETRO_POINT:
            return {
                ...state,
                selectedRetroPoint: action.payload,
            };
        case ACTION_TYPES.OPEN_CLOSE_RETRO_POINT_MODAL:
            return {
                ...state,
                isRetroPointModalOpen: action.payload,
            };
        case ACTION_TYPES.OPEN_CLOSE_RETRO_SETTINGS:
            return {
                ...state,
                isSettingsOpen: action.payload,
            };
        default:
            return state;
    }
};
