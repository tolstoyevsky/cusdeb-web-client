import path from "path";
import webpack from "webpack"; // eslint-disable-line import/no-extraneous-dependencies
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"; // eslint-disable-line import/no-extraneous-dependencies

import baseConfig from "./webpack.base.config";
import {
    cusdebAnonymousUrl,
    cusdebApiUrl,
    cusdebHelpikUrl,
    cusdebTzURL,
    host,
    port,
} from "../config/main";

export default {
    ...baseConfig,
    mode: "development",
    devtool: "eval-source-map",
    plugins: [
        ...baseConfig.plugins,
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            generateStatsFile: true,
            statsOptions: { source: false },
        }),
        new webpack.EnvironmentPlugin({
            MODE: "development",
        }),
    ],
    devServer: {
        host,
        port,
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        historyApiFallback: true,
        proxy: {
            "/anonymous": {
                target: cusdebAnonymousUrl,
            },
            "/api/v1": {
                target: cusdebApiUrl,
            },
            "/helpik_api": {
                target: cusdebHelpikUrl,
            },
            "/tz": {
                target: cusdebTzURL,
            },
        },
    },
};
