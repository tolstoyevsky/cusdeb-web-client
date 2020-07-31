import webpack from "webpack"; // eslint-disable-line import/no-extraneous-dependencies

import baseConfig from "./webpack.base.config";

export default {
    ...baseConfig,
    mode: "production",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.EnvironmentPlugin({
            MODE: "production",
        }),
    ],
};
