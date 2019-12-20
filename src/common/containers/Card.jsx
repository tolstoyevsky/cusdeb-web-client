import React from "react";
import PropTypes from "prop-types";

const Card = props => (
    <div className="card">
        <div className={"card-body " + props.additionalClasses}>
            {props.children}
        </div>
    </div>
)

Card.propTypes = {
    additionalClasses: PropTypes.string,
}

Card.defaultProps = {
    additionalClasses: "",
}

export default Card;
