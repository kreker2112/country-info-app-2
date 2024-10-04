const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
            }),
        ],
    },
    publicPath:
        process.env.NODE_ENV === 'production' ? '/country-info-app/' : '/',
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/styles/_globals.scss";`,
            },
        },
    },
});
