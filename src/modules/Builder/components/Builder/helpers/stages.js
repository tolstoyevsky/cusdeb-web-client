import { matchPath } from "react-router-dom";

import { configureStore } from "root/store";
import { executeStage as executeInitializationStage } from "../../Initialization/actions/initialization";

export const stages = {
    initialization: {
        path: "/builder/initialization",
        action: executeInitializationStage,
        prevStageAvailable: false,
        nextStageAvailable: true,
    },
    packagelist: {
        path: "/builder/packagelist",
        prevStageAvailable: false,
        nextStageAvailable: true,
    },
    users: {
        path: "/builder/users",
        prevStageAvailable: true,
        nextStageAvailable: true,
    },
    configuration: {
        path: "/builder/configuration",
        prevStageAvailable: true,
        nextStageAvailable: true,
    },
    authorization: {
        path: "/builder/authorization",
        prevStageAvailable: true,
        nextStageAvailable: false,
        skipForAuthorized: true,
    },
    build: {
        path: "/builder/build",
        prevStageAvailable: false,
        nextStageAvailable: false,
    },
};

const getFilteredStageValues = () => {
    let stageValues = Object.values(stages);

    const store = configureStore();
    const { app: { user } } = store.getState();
    if (user) {
        stageValues = stageValues.filter((stage) => (!stage.skipForAuthorized));
    }

    return stageValues;
};

export const getStages = (path_ = null) => {
    const path = path_ || window.location.pathname;
    const stageValues = getFilteredStageValues();

    const currentStageIndex = stageValues.findIndex(
        (stage) => matchPath(stage.path, path),
    );
    return [
        stageValues[currentStageIndex - 1],
        stageValues[currentStageIndex],
        stageValues[currentStageIndex + 1],
    ];
};

export const toBuildStage = (history) => {
    const stageValues = getFilteredStageValues();
    const nextStage = stageValues.find((stage) => !stage.nextStageAvailable);
    history.push(nextStage.path);
};

export const toNextStage = (history) => {
    // eslint-disable-next-line no-unused-vars
    const [_prevStage, _currentStage, nextStage] = getStages();
    history.push(nextStage.path);
};

export const toPrevStage = (history) => {
    // eslint-disable-next-line no-unused-vars
    const [prevStage, _currentStage, _nextStage] = getStages();
    history.push(prevStage.path);
};
