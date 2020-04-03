import { handleActions } from "redux-actions";

import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_USER_IMAGES_LIST_SUCCEEDED,
    TOGGLE_NOTES_MODAL,
    UPDATE_MODAL_VALUE,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/dashboard";

const defaultState = {
    imagesList: {},

    imageId: null,
    modalValue: null,
    showNotesModal: false,
    showSucceededMessage: false,
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
        [FETCH_USER_IMAGES_LIST_SUCCEEDED]: (state, { payload: imagesList }) => {
            const imagesObject = {};

            imagesList.forEach((image) => {
                const { image_id: imageId, ...rest } = image;
                imagesObject[imageId] = rest;
            });

            return ({
                ...state,
                imagesList: imagesObject,
            });
        },
        [TOGGLE_NOTES_MODAL]: (state, { payload: imageId }) => ({
            ...state,
            showNotesModal: !state.showNotesModal,
            imageId,
            showSucceededMessage: false,
        }),
        [UPDATE_MODAL_VALUE]: (state, { payload: modalValue }) => ({
            ...state,
            modalValue,
        }),
        [UPDATE_NOTES_SUCCEEDED]: (state, { payload: imageId }) => ({
            ...state,
            imagesList: {
                ...state.imagesList,
                [imageId]: {
                    ...state.imagesList[imageId],
                    notes: state.modalValue,
                },
            },
            showSucceededMessage: true,
        }),
    },
    defaultState,
);
