import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

import { cusdebApiPrefix, cusdebApiUrl } from "../../../config/main"; // TODO: resolve path to config

const doSocialAuth = (social) => {
    window.location.href = `${cusdebApiUrl}/${cusdebApiPrefix}/social/login/${social}`;
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
