import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

import Regular from "common/containers/Regular";

const Fallback = ({ text, count }) => (
    <Regular>
        <div
            className="d-flex justify-content-center flex-column align-items-center mb-n3"
            style={{ minHeight: "inherit" }}
        >
            <Spinner animation="border" style={{ width: "6rem", height: "6rem" }} />
            {count != null && (
                <h3 className="position-relative" style={{ marginTop: "-65px" }}>
                    {count}
                </h3>
            )}

            {text && (
                <h5 className="position-absolute text-center" style={{ marginTop: "200px" }}>
                    {text}
                </h5>
            )}
        </div>
    </Regular>
);

Fallback.propTypes = {
    count: PropTypes.number,
    text: PropTypes.string,
};

Fallback.defaultProps = {
    count: null,
    text: null,
};

export default Fallback;
