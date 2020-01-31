import React from "react";
import PropTypes from "prop-types";

const Card = ({
    title, tools, additionalClasses, children, footer,
}) => (
    <div className="card">
        {(title || tools) && (
            <div className="card-header">
                {title && (
                    <div className="card-title">{title}</div>
                )}
                {tools && (
                    <div className="card-tools">{tools}</div>
                )}
            </div>
        )}

        <div className={`card-body ${additionalClasses}`}>{children}</div>

        {footer && (
            <div className="card-footer">{footer}</div>
        )}
    </div>
);

Card.propTypes = {
    additionalClasses: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
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
};

Card.defaultProps = {
    additionalClasses: "",
    children: [],
    footer: null,
    title: null,
    tools: null,
};

export default Card;
