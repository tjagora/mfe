const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html', // Serve index.html for all routes
        } // Enable history API fallback for SPA routing
    },
    plugins: [
        new ModuleFederationPlugin({
                name: 'container',
                remotes: {
                    marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                },
                shared: packageJson.dependencies, // Share React dependencies to avoid duplication
        }), // Configure Module Federation Plugin as needed
       new HtmlWebpackPlugin({
            template: './public/index.html', // Template for the generated HTML file
       }) 
    ]
};

module.exports = merge(commonConfig, devConfig);