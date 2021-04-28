import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { cleanup } from "@testing-library/react";

import ConfirmDeleteModal from "../ConfirmDeleteModal";

configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("ConfirmDeleteModal", () => {
    const render = ({ show = true }) => mount(
        <ConfirmDeleteModal
            handleClose={jest.fn()}
            handleSubmit={jest.fn()}
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
});
