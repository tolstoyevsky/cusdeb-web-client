import { matchPath } from "react-router-dom";

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
    build: {
        path: "/builder/build",
        prevStageAvailable: false,
        nextStageAvailable: false,
    },
};

export const getStageIndex = (path_ = null) => {
    const path = path_ || window.location.pathname;
    return Object.values(stages).findIndex(
        (stage) => matchPath(stage.path, path),
    );
};

export const toNextStage = (history) => {
    const currentStageIndex = getStageIndex();
    const nextStage = Object.values(stages)[currentStageIndex + 1];
    history.push(nextStage.path);
};

export const toPrevStage = (history) => {
    const currentStageIndex = getStageIndex();
    const prevStage = Object.values(stages)[currentStageIndex - 1];
    history.push(prevStage.path);
};
