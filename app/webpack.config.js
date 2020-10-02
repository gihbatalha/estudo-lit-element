var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/index.ts',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    // Cria as rotas e já injeta o script gerado no build
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: 'src/examples/index.html'
    }),
    new HtmlWebpackPlugin({ 
      filename: 'my-element.html',
      template: 'src/examples/my-element.html'
    }),
    new HtmlWebpackPlugin({ 
      filename: 'filters.html',
      template: 'src/examples/filters.html'
    }),
    new HtmlWebpackPlugin({ 
      filename: 'filters-draft.html',
      template: 'src/drafts/filters.html'
    })
  ]
};