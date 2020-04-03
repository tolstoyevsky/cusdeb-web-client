import { createAction } from "redux-actions";

import {
    DELETE_IMAGE,
    DELETE_IMAGE_SUCCEEDED,
    FETCH_USER_IMAGES_LIST,
    FETCH_USER_IMAGES_LIST_SUCCEEDED,
    TOGGLE_NOTES_MODAL,
    UPDATE_MODAL_VALUE,
    UPDATE_NOTES,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/dashboard";

export const deleteCurrentImage = createAction(DELETE_IMAGE);

export const deleteImageSucceeded = createAction(DELETE_IMAGE_SUCCEEDED);

export const fetchUserImagesList = createAction(FETCH_USER_IMAGES_LIST);

export const fetchUserImagesListSucceeded = createAction(FETCH_USER_IMAGES_LIST_SUCCEEDED);

export const toggleNotesModal = createAction(TOGGLE_NOTES_MODAL);

export const updateModalValue = createAction(UPDATE_MODAL_VALUE);

export const updateNotes = createAction(UPDATE_NOTES);

export const updateNotesSucceeded = createAction(UPDATE_NOTES_SUCCEEDED);
