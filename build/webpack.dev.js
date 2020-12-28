const webpack = require('webpack');
const path = require('path');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		open: false,
		port: 9999,
		hot: true,
		proxy: {
			'/cesium/3DModel/*': {
				target: 'http://localhost:8080'
			}
		}
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	// output: {
	// 	filename: '[name].js',
	// 	chunkFilename: '[name].js',
	// }
}

module.exports = devConfig;