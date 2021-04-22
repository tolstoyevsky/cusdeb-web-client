import { handleActions } from "redux-actions";

import {
    FETCH_IMAGE_FAILED,
    FETCH_IMAGE_SUCCEEDED,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/imageDetail";

const defaultState = {
    image: {},
    imageFetching: true,
    imageNotFound: false,
};

export default handleActions(
    {
        [FETCH_IMAGE_FAILED]: (state) => ({
            ...state,
            imageNotFound: true,
            imageFetching: false,
        }),
        [FETCH_IMAGE_SUCCEEDED]: (state, { payload: image }) => ({
            ...state,
            image,
            imageFetching: false,
        }),
        [UPDATE_NOTES_SUCCEEDED]: (state, { payload: { notes } }) => ({
            ...state,
            image: {
                ...state.image,
                notes,
            },
        }),
    },
    defaultState,
);
