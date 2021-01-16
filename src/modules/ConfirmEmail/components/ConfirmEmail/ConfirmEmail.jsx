import qs from "querystring";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import Fallback from "common/components/Fallback";
import { confirmEmailRequest } from "../../actions/confirmEmail";

const ConfirmEmail = ({ confirmEmailRequestAction, tokenIsFetching, tokenStatus }) => {
    useEffect(() => {
        const qsParams = qs.parse(window.location.search.replace("?", ""));
        confirmEmailRequestAction(qsParams.token);
    }, []);

    if (tokenIsFetching) {
        return <Fallback />;
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    CusDeb
                </div>
                <Card>
                    <Card.Body>
                        {tokenStatus ? (
                            <>
                                <p>Success! You have confirmed your email address.</p>
                                <p className="mb-0 mt-3">
                                    <a href="/signin">Sign in</a>
                                </p>
                            </>
                        ) : (
                            <>
                                <p>Link has expired or is invalid.</p>
                                <p className="mb-0 mt-3">
                                    <a href="/signup">Register a new account</a>
                                </p>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

ConfirmEmail.propTypes = {
    confirmEmailRequestAction: PropTypes.func.isRequired,
    tokenIsFetching: PropTypes.bool.isRequired,
    tokenStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ confirmEmail }) => ({
    tokenIsFetching: confirmEmail.tokenIsFetching,
    tokenStatus: confirmEmail.tokenStatus,
});

const mapDispatchToProps = (dispatch) => ({
    confirmEmailRequestAction: (token) => dispatch(confirmEmailRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
