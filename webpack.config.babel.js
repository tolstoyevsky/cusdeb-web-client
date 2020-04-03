import path from "path";
import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "./src");

const HOST = process.env.HOST || "localhost";
const { BM_RPC_ADDR, CUSDEB_API_URL } = process.env;

if (!BM_RPC_ADDR) {
    throw new Error("The Black Magic RPC server address is not specified.");
}
if (!CUSDEB_API_URL) {
    throw new Error("The CusDeb API server address is not specified.");
}

module.exports = {
    entry: [
        "babel-polyfill",
        path.join(srcPath, "root/index.jsx"),
    ],
    output: {
        publicPath: "/",
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
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.EnvironmentPlugin({
            BM_RPC_ADDR: JSON.stringify(BM_RPC_ADDR),
            CUSDEB_API_URL: JSON.stringify(CUSDEB_API_URL),
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
        },
    },
};
