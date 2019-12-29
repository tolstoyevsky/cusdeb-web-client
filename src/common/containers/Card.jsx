import React from "react";
import PropTypes from "prop-types";

const Card = props => (
    <div className="card">
        {(props.title || props.tools) && (
            <div className="card-header">
                {props.title && (
                    <div className="card-title">
                        {props.title}
                    </div>
                )}
                {props.tools && (
                    <div className="card-tools">
                        {props.tools}
                    </div>
                )}
            </div>
        )}

        <div className={"card-body " + props.additionalClasses}>
            {props.children}
        </div>

        {props.footer && (
            <div className="card-footer">
                {props.footer}
            </div>
        )}
    </div>
)

Card.propTypes = {
    additionalClasses: PropTypes.string,
    footer: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
        PropTypes.string,
    ]),
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    tools: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
}

Card.defaultProps = {
    additionalClasses: "",
}

export default Card;
