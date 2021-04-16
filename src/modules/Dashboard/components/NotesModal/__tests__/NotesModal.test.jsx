import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Alert, Modal } from "react-bootstrap";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { cleanup } from "@testing-library/react";

import NotesModal from "../NotesModal";

configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("NotesModal", () => {
    const imageId = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
    const mockStore = configureStore([]);

    const render = ({ initialValue, show = true, showNotesSucceededMessage = false }) => {
        const initialState = {
            dashboard: {
                showNotesSucceededMessage,
            },
        };
        const store = mockStore(initialState);

        return mount(
            <Provider store={store}>
                <NotesModal
                    handleClose={jest.fn()}
                    handleSubmit={jest.fn()}
                    show={show}
                    imageId={imageId}
                    initialValue={initialValue}
                    showNotesSucceededMessage={showNotesSucceededMessage}
                />
            </Provider>,
        );
    };

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
     * Checks if the succeeded alert is shown when the showNotesSucceededMessage prop is true.
     */
    it("Succeeded alert is shown", () => {
        const component = render({ showNotesSucceededMessage: true });
        expect(component.find(Alert).prop("show")).toEqual(true);
    });

    /**
     * Checks if the succeeded alert isn't shown when the showNotesSucceededMessage prop is false.
     */
    it("Succeeded alert isn't shown", () => {
        const component = render({});
        expect(component.find(Alert).prop("show")).toEqual(false);
    });

    /**
     * Checks if the specified initial value is used in the textarea field by default.
     */
    it("Specify initial value for textarea", () => {
        const initialValue = "Test value";
        const component = render({ initialValue });
        expect(component.find("textarea").prop("value")).toEqual(initialValue);
    });

    /**
     * Checks entering a value into the textarea field.
     */
    it("Enter value into textarea", () => {
        const value = "Test value";
        const component = render({});
        const textarea = component.find("textarea");
        textarea.simulate("change", { target: { value } });
        expect(component.find("textarea").prop("value")).toEqual(value);
    });
});
