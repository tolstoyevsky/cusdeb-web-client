import {
    deleteImageSucceeded,
    fetchUserImagesListSucceeded,
    toggleNotesModal,
    updateModalValue,
    updateNotesSucceeded,
} from "../dashboard";
import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_USER_IMAGES_LIST_SUCCEEDED,
    TOGGLE_NOTES_MODAL,
    UPDATE_MODAL_VALUE,
    UPDATE_NOTES_SUCCEEDED,
} from "../../constants/dashboard";

describe("Dashboard actions", () => {
    it("deleteImageSucceeded", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const expectedAction = {
            type: DELETE_IMAGE_SUCCEEDED,
            payload: imageId,
        };
        expect(deleteImageSucceeded(imageId)).toEqual(expectedAction);
    });

    it("fetchUserImagesListSucceeded", () => {
        const imagesList = [
            {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: "",
            },
        ];
        const expectedAction = {
            type: FETCH_USER_IMAGES_LIST_SUCCEEDED,
            payload: imagesList,
        };
        expect(fetchUserImagesListSucceeded(imagesList)).toEqual(expectedAction);
    });

    it("toggleNotesModal", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const expectedAction = {
            type: TOGGLE_NOTES_MODAL,
            payload: imageId,
        };
        expect(toggleNotesModal(imageId)).toEqual(expectedAction);
    });

    it("updateModalValue", () => {
        const modalValue = "Some notes here";
        const expectedAction = {
            type: UPDATE_MODAL_VALUE,
            payload: modalValue,
        };
        expect(updateModalValue(modalValue)).toEqual(expectedAction);
    });

    it("updateNotesSucceeded", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const expectedAction = {
            type: UPDATE_NOTES_SUCCEEDED,
            payload: imageId,
        };
        expect(updateNotesSucceeded(imageId)).toEqual(expectedAction);
    });
});
