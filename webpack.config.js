/**
 * @typedef {import("webpack").Configuration} WebpackConfiguration
 */

const { resolve } = require("path")

const { merge } = require("webpack-merge")
const { DefinePlugin } = require("webpack")
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

/**
 * @type {WebpackConfiguration}
 */
const COMMON_CONFIG = {
	entry: {
		main: "./src/main.js"
	},
	output: {
		path: resolve(__dirname, "dist"),
		filename: "js/[name].[contenthash:6].js",
		chunkFilename: "js/[name].[contenthash:6].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: ["vue-loader"]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "file-loader",
				options: {
					name: "img/[path][name].[ext]"
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:6].css"
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "webpack5实践",
			template: resolve(__dirname, "public/index.html")
		}),
		new VueLoaderPlugin(),
		new DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		moduleIds: "deterministic", // 将构建后的hash值改为数字
		sideEffects: true
	}
}

/**
 * @type {WebpackConfiguration}
 */
const DEV_CONFIG = {
	mode: "development"
}

/**
 * @type {WebpackConfiguration}
 */
const PROD_CONFIG = {
	mode: "production",
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: "all"
		},
		moduleIds: "deterministic", // 将构建后的hash值改为数字
		sideEffects: true
	},
	devtool: false,
	plugins: [new CssMinimizerPlugin()]
}

module.exports = env => {
	const isDEV = env.dev
	if (isDEV) {
		return merge(COMMON_CONFIG, DEV_CONFIG)
	}
	return merge(COMMON_CONFIG, PROD_CONFIG)
}
