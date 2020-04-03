import { handleActions } from "redux-actions";

import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST_SUCCEEDED,
    HIDE_NOTES_SUCCEEDED_MESSAGE,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/dashboard";

const defaultState = {
    images: {},
    showNotesSucceededMessage: false,
};

export default handleActions(
    {
        [DELETE_IMAGE_SUCCEEDED]: (state, { payload: imageId }) => {
            const images = { ...state.images };
            delete images[imageId];

            return { ...state, images };
        },
        [FETCH_IMAGES_LIST_SUCCEEDED]: (state, { payload: imagesList }) => {
            const images = {};
            imagesList.forEach((image) => {
                images[image.image_id] = image;
            });

            return { ...state, images };
        },
        [HIDE_NOTES_SUCCEEDED_MESSAGE]: (state) => ({
            ...state,
            showNotesSucceededMessage: false,
        }),
        [UPDATE_NOTES_SUCCEEDED]: (state, { payload: { imageId, notes } }) => ({
            ...state,
            images: {
                ...state.images,
                [imageId]: {
                    ...state.images[imageId],
                    notes,
                },
            },
            showNotesSucceededMessage: true,
        }),
    },
    defaultState,
);
