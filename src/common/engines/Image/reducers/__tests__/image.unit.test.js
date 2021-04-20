import { toggleNotesSucceededMessage } from "../../actions/image";
import ImageReducer from "../image";

describe("Image reducer", () => {
    it("Default state", () => {
        expect(ImageReducer(undefined, {})).toEqual({
            showNotesSucceededMessage: false,
        });
    });

    it("TOGGLE_NOTES_SUCCEEDED_MESSAGE with false initial value", () => {
        const reducer = ImageReducer(
            { showNotesSucceededMessage: false },
            toggleNotesSucceededMessage(true),
        );
        expect(reducer).toEqual({ showNotesSucceededMessage: true });
    });

    it("TOGGLE_NOTES_SUCCEEDED_MESSAGE with true initial value", () => {
        const reducer = ImageReducer(
            { showNotesSucceededMessage: true },
            toggleNotesSucceededMessage(false),
        );
        expect(reducer).toEqual({ showNotesSucceededMessage: false });
    });
});
