import React, { Component } from "react";

import Fallback from "common/components/Fallback";
import * as API from "api/http/users";
import { setTokens } from "utils/token";

export default class SocialAuthRedirect extends Component {
    componentDidMount() {
        API.socialSignIn()
            .then((response) => {
                const { access, refresh } = response.data;
                setTokens(access, refresh);
                window.location.href = "/dashboard";
            });
    }

    render() {
        return (
            <Fallback />
        );
    }
}
