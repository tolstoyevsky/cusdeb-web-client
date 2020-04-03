import { createAction } from "redux-actions";

import {
    DELETE_IMAGE,
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST,
    FETCH_IMAGES_LIST_SUCCEEDED,
    TOGGLE_NOTES_MODAL,
    UPDATE_MODAL_VALUE,
    UPDATE_NOTES,
    UPDATE_NOTES_LOCALLY,
} from "../constants/dashboard";

export const deleteCurrentImage = createAction(
    DELETE_IMAGE,
    (imageId) => imageId,
);

export const deleteImageSucceeded = createAction(
    DELETE_IMAGE_SUCCEEDED,
    (imageId) => imageId,
);

export const fetchImagesList = createAction(FETCH_IMAGES_LIST);

export const fetchImagesListSucceeded = createAction(
    FETCH_IMAGES_LIST_SUCCEEDED,
    (imageList) => imageList,
);

export const toggleNotesModal = createAction(
    TOGGLE_NOTES_MODAL,
    (imageId) => imageId,
);

export const updateModalValue = createAction(
    UPDATE_MODAL_VALUE,
    (modalValue) => modalValue,
);

export const updateNotes = createAction(UPDATE_NOTES);

export const updateImageNotesLocally = createAction(
    UPDATE_NOTES_LOCALLY,
    (imageId) => imageId,
);
