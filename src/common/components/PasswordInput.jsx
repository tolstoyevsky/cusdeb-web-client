import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Input from "common/components/Input";

const PasswordInput = ({
    name,
    value,
    placeholder,
    variant,
    disabled,
}) => {
    const [inputType, setInputType] = useState("password");

    const changeInputType = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    };

    return (
        <InputGroup>
            <Input
                type={inputType}
                name={name}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
            />
            <InputGroup.Append>
                <Button onClick={changeInputType} variant={variant}>
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    variant: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PasswordInput.defaultProps = {
    value: "",
    variant: "primary",
    placeholder: null,
    disabled: false,
};

export default PasswordInput;
