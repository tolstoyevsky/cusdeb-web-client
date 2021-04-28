import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { cleanup } from "@testing-library/react";

import ConfirmDeleteModal from "common/engines/Image/components/ConfirmDeleteModal/ConfirmDeleteModal";
import DownloadInfoModal from "common/engines/Image/components/DownloadInfoModal/DownloadInfoModal";
import NotesModal from "common/engines/Image/components/NotesModal/NotesModal";
import { buildResultUrl } from "../../../../../../config/main"; // TODO: resolve path to config
import CardImage from "../CardImage";

configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("CardImage", () => {
    const mockStore = configureStore([]);
    const deviceList = {
        "rpi-4-b": {
            name: "Raspberry Pi",
            generation: 4,
            model: "Model B",
            distros: {
                "raspbian-buster-armhf": {
                    name: "Raspbian",
                    codename: "Buster",
                    version: 10,
                    port: "armhf",
                    packages_url: "https://packages.debian.org/buster/",
                    build_types: ["classic"],
                },
            },
        },
    };
    const image = (status = "Undefined") => ({
        image_id: "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
        device_name: "rpi-4-b",
        distro_name: "raspbian-buster-armhf",
        flavour: "Classic",
        started_at: null,
        status,
        notes: "",
    });

    const render = ({ imageStatus }) => {
        const initialState = {
            common: {
                deviceList,
            },
            image: {
                showNotesSucceededMessage: false,
            },
        };
        const store = mockStore(initialState);

        return mount(
            <Provider store={store}>
                <CardImage
                    image={image(imageStatus)}
                />
            </Provider>,
        );
    };

    /**
     * Checks the 'href' and 'download' attributes of the download button.
     */
    it("Download Button attributes is valid", () => {
        const component = render({ imageStatus: "Succeeded" });
        const downloadButton = component.find(Button).at(1);
        expect(downloadButton.prop("href")).toBe(`${buildResultUrl}/${image().image_id}.img.gz`);
        expect(downloadButton.prop("download")).toBe(true);
    });

    /**
     * Checks if the modal window for downloading an image is shown when the status of the image
     * is Undefined.
     */
    it("Download modal is shown when image status is Undefined", () => {
        const component = render({});

        const hiddenDownloadImageModal = component.find(DownloadInfoModal).find(Modal);
        const nestedHiddenDownloadImageModal = hiddenDownloadImageModal.children();
        expect(nestedHiddenDownloadImageModal.children().length).toEqual(0);

        const addNotesButton = component.find(Button).at(1);
        addNotesButton.simulate("click");

        const showedDownloadImageModal = component.find(DownloadInfoModal).find(Modal);
        const nestedShowedDownloadImageModal = showedDownloadImageModal.children();
        expect(nestedShowedDownloadImageModal.children().length).toBeGreaterThan(0);
    });

    /**
     * Checks if the modal window for adding notes is shown.
     */
    it("Add notes modal is shown", () => {
        const component = render({});

        const hiddenNotesModal = component.find(NotesModal).find(Modal);
        const nestedHiddenNotesModal = hiddenNotesModal.children();
        expect(nestedHiddenNotesModal.children().length).toEqual(0);

        const addNotesButton = component.find(Button).at(0);
        addNotesButton.simulate("click");

        const showedNotesModal = component.find(NotesModal).find(Modal);
        const nestedShowedHiddenNotesModal = showedNotesModal.children();
        expect(nestedShowedHiddenNotesModal.children().length).toBeGreaterThan(0);
    });

    /**
     * Checks if the modal window for deleting image is shown.
     */
    it("Delete image modal is shown", () => {
        const component = render({});

        const hiddenDeleteImageModal = component.find(ConfirmDeleteModal).find(Modal);
        const nestedHiddenDeleteImageModal = hiddenDeleteImageModal.children();
        expect(nestedHiddenDeleteImageModal.children().length).toEqual(0);

        const addNotesButton = component.find(Button).at(2);
        addNotesButton.simulate("click");

        const showedDeleteImageModal = component.find(ConfirmDeleteModal).find(Modal);
        const nestedShowedDeleteImageModal = showedDeleteImageModal.children();
        expect(nestedShowedDeleteImageModal.children().length).toBeGreaterThan(0);
    });
});
