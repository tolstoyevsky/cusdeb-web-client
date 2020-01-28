import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Regular from "common/containers/Regular";

const Error404 = () => (
    <Regular>
        <section className="content-header">
            <div className="error-page">
                <h2 className="headline text-warning">404</h2>
                <div className="error-content">
                    <h3>
                        <FontAwesomeIcon className="text-warning" icon={faExclamationTriangle} />
                        Oops! Page not found.
                    </h3>
                    <p>
                        We could not find the page you were looking for.
                        Meanwhile, you may return to
                        <a href="/">
                        &nbsp;main page.
                        </a>
                    </p>
                </div>
            </div>
        </section>
    </Regular>
);

export default Error404;
