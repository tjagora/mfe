const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
 
const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html', // Serve index.html for all routes
        } // Enable history API fallback for SPA routing
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing', // Name of the remote module
            filename: 'remoteEntry.js', 
            exposes: {
                    './MarketingApp': './src/bootstrap' // Expose the bootstrap file as Marketing App
            }, // Expose any modules if needed
            shared: packageJson.dependencies, // Share React dependencies to avoid duplication
        }),// Filename for the remote entry point
       new HtmlWebpackPlugin({
            template: './public/index.html', // Template for the generated HTML file
       }) 
    ]
};

module.exports = merge(commonConfig, devConfig);