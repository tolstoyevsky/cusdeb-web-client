import { createAction } from "redux-actions";

import {
    FETCH_IMAGE,
    FETCH_IMAGE_FAILED,
    FETCH_IMAGE_SUCCEEDED,
    UPDATE_NOTES_SUCCEEDED,
} from "../constants/imageDetail";

export const fetchImage = createAction(FETCH_IMAGE);

export const fetchImageFailed = createAction(FETCH_IMAGE_FAILED);

export const fetchImageSucceeded = createAction(FETCH_IMAGE_SUCCEEDED);

export const updateNotesSucceeded = createAction(UPDATE_NOTES_SUCCEEDED);
