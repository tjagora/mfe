module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/, // Match .js and .mjs files
                exclude: /node_modules/, // Exclude node_modules from transpilation
                use: {
                    loader: 'babel-loader', // Use Babel to transpile JavaScript
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'], // Presets for React and modern JavaScript
                        plugins: ['@babel/plugin-transform-runtime'], // Plugin for class properties
                    },
                },
            },
        ],
    }, 
};