import { createAction } from "redux-actions";

import {
    DELETE_IMAGE,
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST,
    FETCH_IMAGES_LIST_SUCCEEDED,
    HIDE_NOTES_SUCCEEDED_MESSAGE,
    UPDATE_NOTES,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/dashboard";

export const deleteImage = createAction(DELETE_IMAGE);

export const deleteImageSucceeded = createAction(DELETE_IMAGE_SUCCEEDED);

export const fetchImagesList = createAction(FETCH_IMAGES_LIST);

export const fetchImagesListSucceeded = createAction(FETCH_IMAGES_LIST_SUCCEEDED);

export const hideNotesSucceededMessage = createAction(HIDE_NOTES_SUCCEEDED_MESSAGE);

export const updateNotes = createAction(UPDATE_NOTES);

export const updateNotesSucceeded = createAction(UPDATE_NOTES_SUCCEEDED);
