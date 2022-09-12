const { resolve } = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		path: resolve(__dirname, 'dist'),
		library: 'GitlabActivityCalendar',
		filename: 'index.js',
		libraryTarget: 'umd'
	},
	devtool: 'source-map'
};
