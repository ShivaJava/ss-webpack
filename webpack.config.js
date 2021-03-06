var webpack = require("webpack");
const path = require("path");
const fs = require('fs');

// include the js minification plugin
const TerserPlugin = require('terser-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// include the HTML templating plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// function generateHtmlPlugins (templateDir) {
//     const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
//     return templateFiles.map(item => {
//         // Split names and extension
//         const parts = item.split('.')
//         const name = parts[0]
//         const extension = parts[1]
//         return new HtmlWebpackPlugin({
//             inject: 'body',
//             filename: `${name}.html`,
//             template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
//         })
//     })
// }
// const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
    entry: ["./src/js/index.js", "./src/scss/main.scss"],
    output: {
        filename: "js/index.[hash:8].js",
        path: path.join(__dirname, "../assets/")
    },
    devServer: {
        contentBase: "./build"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, // js
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../'
                    }
                }]
            },
            {
                test: /\.(svg|png|jpe?g)/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "./images/[name].[ext]",
                            limit: 5000
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            }, // css
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }  // scss
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/main.[contenthash:8].css"
          }),
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/fonts',
            to: 'fonts'
        }]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '!!html-loader?interpolate!src/index.html',
        })
    ]
    // .concat(htmlPlugins)
    .concat(new HtmlBeautifyPlugin({
        config: {
            html: {
                end_with_newline: true,
                indent_size: 2,
                indent_with_tabs: true,
                indent_inner_html: true,
                preserve_newlines: true,
                unformatted: ['p', 'i', 'b', 'span']
            }
        }
    })),
    optimization: {
        minimize: true,
        minimizer: [
            // enable the js minification plugin
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            // enable the css minification plugin
            // new OptimizeCSSAssetsPlugin({}),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};
