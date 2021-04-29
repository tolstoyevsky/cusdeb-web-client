import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { buildResultUrl } from "../../../../../../config/main";
import DownloadInfoModal from "../DownloadInfoModal/DownloadInfoModal";

const imageFileExtension = ".img.gz";

const DownloadButton = ({
    className,
    imageId,
    imageStatus,
    short,
}) => {
    const [showDownloadInfoModal, setDownloadInfoModal] = useState(false);
    const openDownloadInfoModal = () => setDownloadInfoModal(true);
    const closeDownloadInfoModal = () => setDownloadInfoModal(false);

    const downloadAction = (event) => {
        if (imageStatus !== "Succeeded") {
            event.preventDefault();
            openDownloadInfoModal();
        }
    };

    return (
        <>
            <Button
                variant="success"
                className={className}
                onClick={downloadAction}
                href={`${buildResultUrl}/${imageId}${imageFileExtension}`}
                download
            >
                <FontAwesomeIcon icon={faDownload} />
                {!short && (
                    <span className="ml-1">Download</span>
                )}
            </Button>
            <DownloadInfoModal
                handleClose={closeDownloadInfoModal}
                show={showDownloadInfoModal}
                imageStatus={imageStatus}
            />
        </>
    );
};

DownloadButton.propTypes = {
    className: PropTypes.string,
    imageId: PropTypes.string.isRequired,
    imageStatus: PropTypes.string.isRequired,
    short: PropTypes.bool,
};

DownloadButton.defaultProps = {
    className: null,
    short: false,
};

export default DownloadButton;
