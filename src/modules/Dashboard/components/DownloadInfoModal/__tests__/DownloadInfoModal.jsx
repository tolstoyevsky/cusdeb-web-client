import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { cleanup } from "@testing-library/react";

import DownloadInfoModal, { failedText, waitText } from "../DownloadInfoModal";

configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("DownloadInfoModal", () => {
    const render = ({ imageStatus = "Building", show = true }) => mount(
        <DownloadInfoModal
            handleClose={jest.fn()}
            imageStatus={imageStatus}
            show={show}
        />,
    );

    /**
     * Checks if Modal is rendered when the show prop is true.
     */
    it("Modal rendered", () => {
        const component = render({});
        expect(component.find(Modal).length).toEqual(1);
    });

    /**
     * Checks if Modal isn't rendered when the show prop is false.
     */
    it("Modal isn't rendered", () => {
        const component = render({ show: false });
        const modal = component.find(Modal);
        const nestedModal = modal.children();
        expect(nestedModal.children().length).toEqual(0);
    });

    /**
     * Checks if the text in DownloadInfoModal is correct when the status is 'Building'.
     */
    it("Correct text when status is 'Building'", () => {
        const component = render({});
        const modalBody = component.find(Modal.Body);
        expect(modalBody.children().text()).toEqual(waitText);
    });

    /**
     * Checks if the text in DownloadInfoModal is correct when the status is 'Pending'.
     */
    it("Correct text when status is 'Pending'", () => {
        const component = render({ imageStatus: "Pending" });
        const modalBody = component.find(Modal.Body);
        expect(modalBody.children().text()).toEqual(waitText);
    });

    /**
     * Checks if the text in DownloadInfoModal is correct when the status is 'Undefined'.
     */
    it("Correct text when status is 'Undefined'", () => {
        const component = render({ imageStatus: "Undefined" });
        const modalBody = component.find(Modal.Body);
        expect(modalBody.children().text()).toEqual(failedText);
    });

    /**
     * Checks if the text in DownloadInfoModal is correct when the status is 'Failed'.
     */
    it("Correct text when status is 'Failed'", () => {
        const component = render({ imageStatus: "Failed" });
        const modalBody = component.find(Modal.Body);
        expect(modalBody.children().text()).toEqual(failedText);
    });

    /**
     * Checks if the text in DownloadInfoModal is correct when the status is 'Interrupted'.
     */
    it("Correct text when status is 'Interrupted'", () => {
        const component = render({ imageStatus: "Interrupted" });
        const modalBody = component.find(Modal.Body);
        expect(modalBody.children().text()).toEqual(failedText);
    });
});
