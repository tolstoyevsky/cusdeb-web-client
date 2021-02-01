import path from "path";
import webpack from "webpack"; // eslint-disable-line import/no-extraneous-dependencies
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin"; // eslint-disable-line import/no-extraneous-dependencies
import HtmlWebPackPlugin from "html-webpack-plugin"; // eslint-disable-line import/no-extraneous-dependencies

import * as mainConfig from "../config/main";
import { rootPath, srcPath } from "../config/paths";

export default {
    entry: ["babel-polyfill", path.join(srcPath, "root/index.jsx")],
    resolve: {
        modules: [
            srcPath,
            "node_modules",
        ],
        extensions: [".js", ".jsx"],
        alias: {
            "admin-lte-css": path.join(rootPath, "node_modules/admin-lte/dist/css/adminlte.min.css"),
            "admin-lte-js": path.join(rootPath, "node_modules/admin-lte/dist/js/adminlte.min.js"),
        },
    },
    output: {
        path: path.resolve("dist"),
        filename: "[name].min.js?[hash]",
        publicPath: "/",
    },
    node: { fs: "empty" },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ],
                        plugins: [
                            // Allows to declare static attributes in classes.
                            "@babel/plugin-proposal-class-properties",
                        ],
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextWebpackPlugin("[name].min.css?[hash]"),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.svg",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.EnvironmentPlugin({
            BLACKMAGIC_URL: mainConfig.blackmagicUrl,
            DOMINION_URL: mainConfig.dominionUrl,

            CUSDEB_ANONYMOUS_URL: mainConfig.cusdebAnonymousUrl,
            CUSDEB_API_URL: mainConfig.cusdebApiUrl,
            CUSDEB_HELPIK_URL: mainConfig.cusdebHelpikUrl,
            CUSDEB_TZ_URL: mainConfig.cusdebTzURL,

            SENTRY_DSN: mainConfig.sentryDSN,
        }),
    ],
};
