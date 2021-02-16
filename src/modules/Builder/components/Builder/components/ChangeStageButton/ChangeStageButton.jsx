import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "react-bootstrap";

const ChangeStageButton = ({ disabled, onClick, text }) => (
    <Button
        disabled={disabled}
        variant="primary"
        className="pl-5 pr-5"
        onClick={onClick}
    >
        {text}
    </Button>
);

ChangeStageButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

ChangeStageButton.defaultProps = {
    disabled: false,
};

export default ChangeStageButton;
