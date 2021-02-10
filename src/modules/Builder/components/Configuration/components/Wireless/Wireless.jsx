import PropTypes from "prop-types";
import React from "react";
import { Card, Form } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { connect } from "react-redux";

import { validate } from "utils/yup";
import { DEBOUNCE_TIMEOUT } from "../../../../../../../config/main";
import { updateConfigurationParams, setFieldStatus } from "../../actions/configuration";
import { wirelessSchema } from "../../schemas/configuration";

const Wireless = ({
    configurationParams,
    setFieldStatusAction,
    updateConfigurationParamsAction,
}) => {
    const onFieldChange = (event) => {
        const {
            target: {
                checked, name, value, type,
            },
        } = event;

        let fieldValue = value;
        if (type === "checkbox") {
            fieldValue = checked;
        }
        updateConfigurationParamsAction(name, fieldValue);

        const fieldErrors = validate(wirelessSchema, { [name]: fieldValue });
        if (name === "enable_wireless") {
            let WpaSsidStatus = !Object.keys(fieldErrors).includes("WPA_SSID");
            let WpaPskStatus = !Object.keys(fieldErrors).includes("WPA_PSK");
            if (!fieldValue) {
                WpaSsidStatus = true;
                WpaPskStatus = true;
            }
            setFieldStatusAction("WPA_SSID", WpaSsidStatus);
            setFieldStatusAction("WPA_PSK", WpaPskStatus);
        } else {
            setFieldStatusAction(name, !Object.keys(fieldErrors).includes(name));
        }
    };

    const fieldErrors = validate(wirelessSchema, {
        enable_wireless: configurationParams.enable_wireless,
        WPA_SSID: configurationParams.WPA_SSID,
        WPA_PSK: configurationParams.WPA_PSK,
    });

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Check
                            name="enable_wireless"
                            type="checkbox"
                            id="enable-wireless"
                            label="Support Wi-Fi"
                            onChange={onFieldChange}
                            checked={configurationParams.enable_wireless}
                        />
                    </Form.Group>
                    <Form.Group className="position-relative" controlId="WPA_SSID">
                        <Form.Label>Network name</Form.Label>
                        <Form.Control
                            as={DebounceInput}
                            debounceTimeout={DEBOUNCE_TIMEOUT}
                            name="WPA_SSID"
                            type="text"
                            value={configurationParams.WPA_SSID}
                            onChange={onFieldChange}
                            disabled={!configurationParams.enable_wireless}
                            isInvalid={
                                !!fieldErrors.WPA_SSID && configurationParams.enable_wireless
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.WPA_SSID}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="position-relative" controlId="WPA_PSK">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            as={DebounceInput}
                            debounceTimeout={DEBOUNCE_TIMEOUT}
                            name="WPA_PSK"
                            type="password"
                            value={configurationParams.WPA_PSK}
                            onChange={onFieldChange}
                            disabled={!configurationParams.enable_wireless}
                            isInvalid={!!fieldErrors.WPA_PSK && configurationParams.enable_wireless}
                        />
                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.WPA_PSK}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

Wireless.propTypes = {
    configurationParams: PropTypes.shape({
        host_name: PropTypes.string,
        time_zone: PropTypes.string,
        WPA_SSID: PropTypes.string,
        WPA_PSK: PropTypes.string,
        enable_wireless: PropTypes.bool,
    }).isRequired,
    setFieldStatusAction: PropTypes.func.isRequired,
    updateConfigurationParamsAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ configuration }) => ({
    configurationParams: configuration.configurationParams,
    fieldStatuses: configuration.fieldStatuses,
});

const mapDispatchToProps = (dispatch) => ({
    setFieldStatusAction: (fieldName, fieldStatus) => dispatch(
        setFieldStatus({ [fieldName]: fieldStatus }),
    ),
    updateConfigurationParamsAction: (key, value) => dispatch(
        updateConfigurationParams({ key, value }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wireless);
