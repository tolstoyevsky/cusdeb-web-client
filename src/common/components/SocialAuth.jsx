import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

import { cusdebAPIURL } from "config/main";

const doSocialAuth = (social) => {
    window.location.href = `${cusdebAPIURL}/social/login/${social}`;
};

const SocialAuth = () => (
    <div className="social-auth-links text-center">
        <p>- OR -</p>
        <Button variant="danger" block onClick={() => doSocialAuth("google-oauth2")}>
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign in with Google
        </Button>
        <Button variant="dark" block onClick={() => doSocialAuth("github")}>
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            Sign in with GitHub
        </Button>
    </div>
);

export default SocialAuth;
