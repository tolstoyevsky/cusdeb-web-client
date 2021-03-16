import PropTypes from "prop-types";
import * as React from "react";
import { withRouter } from "react-router-dom";

import { urls } from "root/Routes/Routes";

const Authorization = ({ history }) => {
    const toSignIn = (event) => {
        event.preventDefault();
        history.push(urls.signIn);
    };

    return (
        <div className="text-center mb-5">
            <h3>Building is available only for authorized users</h3>
            <h4>
                <a type="button" href={urls.signIn} onClick={toSignIn}>Sign in</a>
                &nbsp;and after that you can continue building the current image
            </h4>
        </div>
    );
};

Authorization.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};

export default withRouter(Authorization);
