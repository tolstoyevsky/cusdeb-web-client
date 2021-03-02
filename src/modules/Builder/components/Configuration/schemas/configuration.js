import * as yup from "yup";

export const mainSchema = yup.object().shape({
    host_name: yup.string()
        .matches(
            /(^$|^[.\da-z]{1,253}$)/i,
            "Host name must be between 1 and 253 characters of Latin letters, "
            + "numbers or a dot character",
        ).required("This field cannot be blank"),
});

export const wirelessSchema = yup.object().shape({
    enable_wireless: yup.boolean().required(),
    WPA_SSID: yup.string()
        .matches(
            /(^$|^[.\w\d]{1,31}$)/i,
            "Network name must be between 1 and 31 characters of Latin letters, "
            + "numbers or a dot character",
        ).required("This field cannot be blank"),
    WPA_PSK: yup.string()
        .matches(
            /(^$|^[.\w\d]{8,63}$)/i,
            "Password must be either empty or between 8 and 63 characters of Latin letters, "
            + "numbers or a dot character",
        ).required("This field cannot be blank"),
});
