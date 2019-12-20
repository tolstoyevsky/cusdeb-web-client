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
    </div >
)

InputGroup.propTypes = {
    faIcon: PropTypes.object,
    styleName: PropTypes.string,
}

InputGroup.defaultProps = {
    styleName: "",
}

export default InputGroup;
