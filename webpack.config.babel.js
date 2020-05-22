import path from "path";
import webpack from "webpack";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "./src");

const HOST = process.env.HOST || "localhost";
const {
    BM_RPC_URL, CUSDEB_API_URL, CUSDEB_HELPIK_URL, CUSDEB_TZ_URL, DOMINION_RPC_URL,
} = process.env;

if (!BM_RPC_URL) {
    throw new Error("The Black Magic RPC server address is not specified.");
}
if (!CUSDEB_API_URL) {
    throw new Error("The CusDeb API server address is not specified.");
}
if (!CUSDEB_HELPIK_URL) {
    throw new Error("The CusDeb Helpik server adress is not specified.");
}
if (!CUSDEB_TZ_URL) {
    throw new Error("The CusDeb TZ server address is not specified.");
}
if (!DOMINION_RPC_URL) {
    throw new Error("The Dominion RPC server address is not specified.");
}

module.exports = {
    entry: [
        "babel-polyfill",
        path.join(srcPath, "root/index.jsx"),
    ],
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    resolve: {
        modules: [srcPath, "node_modules"],
        extensions: [".js", ".jsx"],
        alias: {
            "admin-lte-css": path.join(__dirname, "/node_modules/admin-lte/dist/css/adminlte.min.css"),
            "admin-lte-js": path.join(__dirname, "/node_modules/admin-lte/dist/js/adminlte.min.js"),
        },
    },
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
                            // "@babel/plugin-syntax-dynamic-import",
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
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            generateStatsFile: true,
            statsOptions: { source: false },
        }),
        new ExtractTextWebpackPlugin("[name].[hash].css"),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.EnvironmentPlugin({
            BM_RPC_URL: JSON.stringify(BM_RPC_URL),
            CUSDEB_API_URL: JSON.stringify(CUSDEB_API_URL),
            CUSDEB_HELPIK_URL: JSON.stringify(CUSDEB_HELPIK_URL),
            CUSDEB_TZ_URL: JSON.stringify(CUSDEB_TZ_URL),
            DOMINION_RPC_URL: JSON.stringify(DOMINION_RPC_URL),
        }),
    ],
    devServer: {
        host: HOST,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        historyApiFallback: true,
        proxy: {
            "/api/v1": {
                target: "http://localhost:3000",
            },
            "/helpik_api": {
                target: "http://localhost:8005",
            },
            "/tz": {
                target: "http://localhost:8006",
            },
        },
    },
};
