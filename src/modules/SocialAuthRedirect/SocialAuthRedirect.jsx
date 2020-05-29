import React, { Component } from "react";

import Fallback from "common/components/Fallback";
import * as API from "api/http/users";

export default class SocialAuthRedirect extends Component {
    componentDidMount() {
        API.socialSignIn()
            .then((response) => {
                const { access, refresh } = response.data;
                localStorage.setItem("socialAccessToken", access);
                localStorage.setItem("socialRefreshToken", refresh);
                window.location.href = "/dashboard";
            });
    }

    render() {
        return (
            <Fallback />
        );
    }
}
