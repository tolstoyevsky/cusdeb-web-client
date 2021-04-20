import { createAction } from "redux-actions";

import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST,
    FETCH_IMAGES_LIST_SUCCEEDED,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/dashboard";

export const deleteImageSucceeded = createAction(DELETE_IMAGE_SUCCEEDED);

export const fetchImagesList = createAction(FETCH_IMAGES_LIST);

export const fetchImagesListSucceeded = createAction(FETCH_IMAGES_LIST_SUCCEEDED);

export const updateNotesSucceeded = createAction(UPDATE_NOTES_SUCCEEDED);
