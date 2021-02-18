import { createAction } from "redux-actions";

import { UPDATE_BUILD_STAGE_AVAILABLE } from "../constants/builder";

export const updateBuildStageAvailable = createAction(UPDATE_BUILD_STAGE_AVAILABLE);
