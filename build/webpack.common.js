const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const fs = require('fs')

const entry = {}
const plugins = []
checkDir('../src/views', 'views')


/**
 * checkDir 遍历文件夹
 * @param {string} path 要遍历的文件夹路径
 * @param {string} fileName 文件夹名字
 */
function checkDir(filePath, fileName) {
	const files = fs.readdirSync(path.resolve(__dirname, filePath))
	if (files && files.length) {
		files.forEach(item => {
			const subdirectoriesPath = `${filePath}/${item}`
			const stats = fs.statSync(path.resolve(__dirname, subdirectoriesPath))

			if (stats.isDirectory()) {
				checkDir(subdirectoriesPath, item)

			} else if (stats.isFile()) {
				if (item.indexOf('index.js') != -1) {
					entry[fileName] = path.resolve(__dirname, `${subdirectoriesPath}`)
				}

				if (item.indexOf('index.html') != -1) {
					plugins.push(new HtmlWebpackPlugin({
						template: path.resolve(__dirname, `${subdirectoriesPath}`),
						filename: `views/${fileName}.html`,
						chunks: ['runtime', 'vendors', fileName]
					}))
				}
			}
		})
	}

}

// const dllFiles = fs.readdirSync(path.resolve(__dirname, '../dll'));

// 	dllFiles.forEach(file => {

// 		if(/.*\.dll.js$/.test(file)) {
// 			plugins.push(new AddAssetHtmlWebpackPlugin({
// 				publicPath: '../js/cesium',
// 				outputPath: 'js/cesium',
// 				filepath: path.resolve(__dirname, '../dll', file)
// 			}))
// 		}
// 		if(/.*\.manifest.json/.test(file)) {
// 			plugins.push(new webpack.DllReferencePlugin({
// 				manifest: path.resolve(__dirname, '../dll', file)
// 			}))
// 		}
// 	});



const commonConfig = {
	entry,
	amd: {
		// enable webpack-friendly use of require in Cesium
		toUrlUndefined: true,
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					publicPath: '../images',
					limit: 2048
				}
			}
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			}
		}]
	},
	node: {
		// Resolve node module use of fs
		// fs: "empty",
	},
	plugins: [

		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, '../node_modules/cesium/Build/Cesium/Workers'), to: 'js/cesium/Workers' },
				{ from: path.resolve(__dirname, '../node_modules/cesium/Build/Cesium/ThirdParty'), to: 'js/cesium/ThirdParty' },
				{ from: path.resolve(__dirname, '../node_modules/cesium/Build/Cesium/Assets'), to: 'js/cesium/Assets' },
				{ from: path.resolve(__dirname, '../node_modules/cesium/Build/Cesium/Widgets'), to: 'js/cesium/Widgets' }
			],
		}),
		new webpack.DefinePlugin({
			//Cesium载入静态的资源的相对路径
			// CESIUM_BASE_URL: JSON.stringify('/dist/js/cesium')
			CESIUM_BASE_URL: JSON.stringify('/js/cesium')
		})
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	_join: ['lodash', 'join']
		// }),
	].concat(plugins),
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors',
				}
			}
		}
	},
	performance: false,
	output: {
		// publicPath:'/dist',
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[hash].js'
		// sourcePrefix: ""
	}
}

module.exports = (env) => {
	console.log("开发模式", env)
	if (env && env.production) {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
}

