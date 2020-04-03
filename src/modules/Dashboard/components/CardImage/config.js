import {
    faQuestionCircle,
    faExclamationCircle,
    faHourglass,
    faCheck,
    faHammer,
} from "@fortawesome/free-solid-svg-icons";

const statusIcon = {
    Undefined: faQuestionCircle,
    Pending: faHourglass,
    Building: faHammer,
    Failed: faExclamationCircle,
    Succeeded: faCheck,
};

export { statusIcon };
