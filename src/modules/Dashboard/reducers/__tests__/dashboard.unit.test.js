import DashboardReducer from "../dashboard";
import {
    deleteImageSucceeded,
    fetchUserImagesListSucceeded,
    toggleNotesModal,
    updateModalValue,
    updateNotesSucceeded,
} from "../../actions/dashboard";

describe("Dashboard reducer", () => {
    it("Default state", () => {
        expect(DashboardReducer(undefined, {})).toEqual({
            imagesList: {},
            imageId: null,
            modalValue: null,
            showNotesModal: false,
            showSucceededMessage: false,
        });
    });

    it("DELETE_IMAGE_SUCCEEDED", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const imagesList = {
            "123e4567-e89b-12d3-a456-426614174000": {
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: "",
            },
        };
        const reducer = DashboardReducer({ imagesList }, deleteImageSucceeded(imageId));
        expect(reducer).toEqual({ imagesList: {} });
    });

    it("FETCH_USER_IMAGES_LIST_SUCCEEDED", () => {
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
        const imagesObject = {
            "123e4567-e89b-12d3-a456-426614174000": {
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: "",
            },
        };
        const reducer = DashboardReducer({}, fetchUserImagesListSucceeded(imagesList));
        expect(reducer).toEqual({ imagesList: imagesObject });
    });

    it("TOGGLE_NOTES_MODAL with false initial value", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const reducer = DashboardReducer(
            { showNotesModal: false, showSucceededMessage: true },
            toggleNotesModal(imageId),
        );
        expect(reducer).toEqual({ showNotesModal: true, showSucceededMessage: false, imageId });
    });

    it("TOGGLE_NOTES_MODAL with true initial value", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const reducer = DashboardReducer(
            { showNotesModal: true, showSucceededMessage: true },
            toggleNotesModal(imageId),
        );
        expect(reducer).toEqual({ showNotesModal: false, showSucceededMessage: false, imageId });
    });

    it("UPDATE_MODAL_VALUE", () => {
        const modalValue = "Some notes here";
        const reducer = DashboardReducer({}, updateModalValue(modalValue));
        expect(reducer).toEqual({ modalValue });
    });

    it("UPDATE_NOTES_SUCCEEDED", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const imagesList = {
            [imageId]: {
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: "",
            },
        };
        const modalValue = "Some notes here";
        const updatedImageslist = {
            [imageId]: {
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: modalValue,
            },
        };
        const reducer = DashboardReducer(
            {
                showSucceededMessage: false,
                imagesList,
                modalValue,
                imageId,
            },
            updateNotesSucceeded(imageId),
        );
        expect(reducer).toEqual({
            imageId,
            imagesList: updatedImageslist,
            modalValue,
            showSucceededMessage: true,
        });
    });
});
