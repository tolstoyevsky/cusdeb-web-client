import { handleActions } from "redux-actions";

import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST_SUCCEEDED,
    TOGGLE_NOTES_MODAL,
    UPDATE_MODAL_VALUE,
    UPDATE_NOTES_LOCALLY,
} from "../constants/dashboard";

const defaultState = {
    imagesList: {},

    showNotesModal: false,
    imageId: "",
    modalValue: "",
};

export default handleActions(
    {
        [DELETE_IMAGE_SUCCEEDED]: (state, { payload: imageId }) => {
            const currentimagesList = { ...state.imagesList };
            delete currentimagesList[imageId];
            return ({
                ...state,
                imagesList: currentimagesList,
            });
        },
        [FETCH_IMAGES_LIST_SUCCEEDED]: (state, { payload: imagesList }) => ({
            ...state,
            imagesList,
        }),
        [TOGGLE_NOTES_MODAL]: (state, { payload: imageId }) => ({
            ...state,
            showNotesModal: !state.showNotesModal,
            imageId,
        }),
        [UPDATE_MODAL_VALUE]: (state, { payload: modalValue }) => ({
            ...state,
            modalValue,
        }),
        [UPDATE_NOTES_LOCALLY]: (state, { payload: imageId }) => ({
            ...state,
            imagesList: {
                ...state.imagesList,
                [imageId]: {
                    ...state.imagesList[imageId],
                    notes: state.modalValue,
                },
            },
        }),
    },
    defaultState,
);
