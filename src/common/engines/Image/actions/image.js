import { createAction } from "redux-actions";

import {
    DELETE_IMAGE,
    TOGGLE_NOTES_SUCCEEDED_MESSAGE,
    UPDATE_NOTES,
} from "../constants/image";

export const deleteImage = createAction(DELETE_IMAGE);

export const toggleNotesSucceededMessage = createAction(TOGGLE_NOTES_SUCCEEDED_MESSAGE);

export const updateNotes = createAction(UPDATE_NOTES);
