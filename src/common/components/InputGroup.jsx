import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputGroup = props => (
    <div className={"input-group " + props.styleName}>
        {props.children}
        
        {props.faIcon && (
            < div className="input-group-append">
                <div className="input-group-text">
                    <FontAwesomeIcon icon={props.faIcon} />
                </div>
            </div>
        )}

        {props.appendElement && (
            <div className="input-group-append">
                {props.appendElement}
            </div>
        )}
    </div >
)

InputGroup.propTypes = {
    appendElement: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    faIcon: PropTypes.object,
    styleName: PropTypes.string,
}

InputGroup.defaultProps = {
    styleName: "",
}

export default InputGroup;
