import { toggleNotesSucceededMessage } from "../image";
import { TOGGLE_NOTES_SUCCEEDED_MESSAGE } from "../../constants/image";

describe("Image actions", () => {
    it("toggleNotesSucceededMessage", () => {
        const expectedAction = {
            type: TOGGLE_NOTES_SUCCEEDED_MESSAGE,
            payload: true,
        };
        expect(toggleNotesSucceededMessage(true)).toEqual(expectedAction);
    });
});
