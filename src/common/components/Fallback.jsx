import React from "react";
import { Spinner } from "react-bootstrap";

import Regular from "common/containers/Regular";

const Fallback = () => (
    <Regular>
        <div className="d-flex justify-content-center align-items-center" style={{ "min-height": "inherit" }}>
            <Spinner animation="border" style={{ width: "4rem", height: "4rem" }} />
        </div>
    </Regular>
);

export default Fallback;
