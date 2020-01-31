import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputGroup = ({
    appendElement, children, faIcon, styleName,
}) => (
    <div className={`input-group ${styleName}`}>
        {children}

        {faIcon && (
            <div className="input-group-append">
                <div className="input-group-text">
                    <FontAwesomeIcon icon={faIcon} />
                </div>
            </div>
        )}

        {appendElement && (
            <div className="input-group-append">
                {appendElement}
            </div>
        )}
    </div>
);

InputGroup.propTypes = {
    appendElement: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    faIcon: PropTypes.object,
    styleName: PropTypes.string,
};

InputGroup.defaultProps = {
    appendElement: "",
    styleName: "",
    faIcon: null,
};

export default InputGroup;
