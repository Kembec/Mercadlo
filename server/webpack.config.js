const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
	target: "node",
	entry: {
		main: "./src/app.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js",
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	plugins: [
		new Dotenv(),
		new CopyWebpackPlugin({
			patterns: [{ from: "./keys", to: "./keys" }],
		}),
	],
};
