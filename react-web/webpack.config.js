const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	devServer: {
		hot: true,
		watchOptions: {
			poll: true
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]_[sha1:hash:hex:4]',
							sourceMap: true,
							minimize: true,
							camelCase: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')({
								'browsers': ['> 1%', 'last 2 versions']
							})],
						}
					}
				]
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			inject: true
		}),
		// new HtmlWebpackPlugin({
		//   filename: 'error.html',
		//   template: 'src/error.html',
		//   inject: true
		// }),
		new CopyWebpackPlugin([{
			from: '../assets/images',
			to: 'assets/images',
			toType: 'dir'
		}])
	]
}