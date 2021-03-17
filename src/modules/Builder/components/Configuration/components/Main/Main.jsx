import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { connect } from "react-redux";

import SelectSearch from "common/components/SelectSearch";
import { validate } from "utils/yup";
import { DEBOUNCE_TIMEOUT } from "../../../../../../../config/main";
import {
    fetchTimeZonesList,
    setFieldStatus,
    updateConfigurationParams,
} from "../../actions/configuration";
import { mainSchema } from "../../schemas/configuration";

const formatTimeZones = (timeZones) => (
    timeZones.map((item) => ({
        value: item,
        text: item,
    }))
);

const Main = ({
    configurationParams,
    fetchTimeZonesListAction,
    setFieldStatusAction,
    timeZonesList,
    updateConfigurationParamsAction,
}) => {
    const fieldErrors = validate(mainSchema, {
        host_name: configurationParams.host_name,
    });

    useEffect(() => {
        fetchTimeZonesListAction();
    }, []);

    useEffect(() => {
        setFieldStatusAction("host_name", !Object.keys(fieldErrors).includes("host_name"));
    }, [configurationParams.host_name]);

    const onFieldChange = (event) => {
        const { target: { name, value } } = event;

        updateConfigurationParamsAction(name, value);
    };

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId="host_name">
                        <Form.Label>Host name</Form.Label>
                        <Form.Control
                            as={DebounceInput}
                            debounceTimeout={DEBOUNCE_TIMEOUT}
                            name="host_name"
                            type="text"
                            value={configurationParams.host_name}
                            onChange={onFieldChange}
                            isInvalid={!!fieldErrors.host_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.host_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <SelectSearch
                        id="timeZones"
                        label="Time zone"
                        defaultValue={configurationParams.time_zone}
                        options={formatTimeZones(timeZonesList)}
                        onChange={(value) => updateConfigurationParamsAction(
                            "time_zone", value,
                        )}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};

Main.propTypes = {
    configurationParams: PropTypes.shape({
        host_name: PropTypes.string,
        time_zone: PropTypes.string,
        WPA_SSID: PropTypes.string,
        WPA_PSK: PropTypes.string,
        enable_wireless: PropTypes.bool,
    }).isRequired,
    fetchTimeZonesListAction: PropTypes.func.isRequired,
    setFieldStatusAction: PropTypes.func.isRequired,
    timeZonesList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateConfigurationParamsAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ configuration }) => ({
    configurationParams: configuration.configurationParams,
    timeZonesList: configuration.timeZonesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTimeZonesListAction: () => dispatch(fetchTimeZonesList()),
    setFieldStatusAction: (fieldName, fieldStatus) => dispatch(
        setFieldStatus({ [fieldName]: fieldStatus }),
    ),
    updateConfigurationParamsAction: (key, value) => dispatch(
        updateConfigurationParams({ key, value }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
