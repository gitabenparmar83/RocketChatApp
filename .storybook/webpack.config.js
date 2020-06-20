const path = require('path')
const fs = require('fs')
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = async ({ config }) => {
	config.module.rules.push({
			test: /\.(s?css|sass)$/,
			use: [
				{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						localIdentName: '[local]___[hash:base64:5]',
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
		{
			test: /\.(js|jsx|mjs)$/,
			include: resolveApp('../src'),
			loader: 'babel-loader',
			options: {
				plugins: [['import', { libraryName: 'material', style: true }]],
				cacheDirectory: true
			}
		},
		{
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'static/media/[name].[hash:8].[ext]'
			}
		}
	);
	config.plugins.push(
		new webpack.ProvidePlugin({
			React: 'react',
		}),
	);
	return config
}
