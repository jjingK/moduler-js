import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

const app = express();
const port = 3030;
const compiler = webpack(config);

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
