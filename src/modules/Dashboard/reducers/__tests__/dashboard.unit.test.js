import DashboardReducer from "../dashboard";
import {
    deleteImageSucceeded,
    fetchImagesListSucceeded,
    updateNotesSucceeded,
} from "../../actions/dashboard";

describe("Dashboard reducer", () => {
    it("Default state", () => {
        expect(DashboardReducer(undefined, {})).toEqual({
            images: {},
        });
    });

    it("DELETE_IMAGE_SUCCEEDED", () => {
        const deletedImageId = "123e4567-e89b-12d3-a456-426614174000";
        const images = {
            "123e4567-e89b-12d3-a456-426614174000": {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status: "Failed",
                notes: "",
            },
            "f99bd97e-ef21-4769-87c6-81a81014c38c": {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "",
            },
        };
        const expectedImages = {
            "f99bd97e-ef21-4769-87c6-81a81014c38c": {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "",
            },
        };
        const reducer = DashboardReducer({ images }, deleteImageSucceeded(deletedImageId));
        expect(reducer).toEqual({ images: expectedImages });
    });

    it("FETCH_IMAGES_LIST_SUCCEEDED", () => {
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
            {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "",
            },
        ];
        const images = {
            "123e4567-e89b-12d3-a456-426614174000": {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status: "Failed",
                notes: "",
            },
            "f99bd97e-ef21-4769-87c6-81a81014c38c": {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "",
            },
        };
        const reducer = DashboardReducer({}, fetchImagesListSucceeded(imagesList));
        expect(reducer).toEqual({ images });
    });

    it("UPDATE_NOTES_SUCCEEDED", () => {
        const imageId = "123e4567-e89b-12d3-a456-426614174000";
        const notes = "Some notes here";
        const images = {
            "123e4567-e89b-12d3-a456-426614174000": {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes: "",
            },
            "f99bd97e-ef21-4769-87c6-81a81014c38c": {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "Some notes 2",
            },
        };
        const expectedImages = {
            "123e4567-e89b-12d3-a456-426614174000": {
                image_id: "123e4567-e89b-12d3-a456-426614174000",
                device_name: "devuan-jessie-armhf",
                distro_name: "raspbian-buster-armhf",
                flavour_display: "Classic",
                started_at: "2020-12-18T13:18:07.156969Z",
                status_display: "Failed",
                notes,
            },
            "f99bd97e-ef21-4769-87c6-81a81014c38c": {
                image_id: "f99bd97e-ef21-4769-87c6-81a81014c38c",
                device_name: "rpi-zero-w",
                distro_name: "raspbian-buster-armhf",
                flavour: "Classic",
                started_at: null,
                status: "Undefined",
                notes: "Some notes 2",
            },
        };
        const reducer = DashboardReducer(
            { images },
            updateNotesSucceeded({ imageId, notes }),
        );
        expect(reducer).toEqual({
            images: expectedImages,
        });
    });
});
