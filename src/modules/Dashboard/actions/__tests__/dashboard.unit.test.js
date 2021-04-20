import {
    deleteImageSucceeded,
    fetchImagesListSucceeded,
    updateNotesSucceeded,
} from "../dashboard";
import {
    DELETE_IMAGE_SUCCEEDED,
    FETCH_IMAGES_LIST_SUCCEEDED,
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

    it("fetchImagesListSucceeded", () => {
        const imagesList = [
            {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status: "Failed",
                notes: "",
            },
        ];
        const expectedAction = {
            type: FETCH_IMAGES_LIST_SUCCEEDED,
            payload: imagesList,
        };
        expect(fetchImagesListSucceeded(imagesList)).toEqual(expectedAction);
    });

    it("updateNotesSucceeded", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const notes = "Some notes";
        const expectedAction = {
            type: UPDATE_NOTES_SUCCEEDED,
            payload: { imageId, notes },
        };
        expect(updateNotesSucceeded({ imageId, notes })).toEqual(expectedAction);
    });
});
