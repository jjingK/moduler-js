import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

import hbs from 'hbs';

const app = express();
const port = 3030;
const compiler = webpack(config);
const dummy = {
  lists: [
    { name: 'Lee' },
    { name: 'Kim' },
    { name: 'Kang' },
    { name: 'Kim' },
    { name: 'Kwon' },
    { name: 'Jeong' },
    { name: 'Kim' },
    { name: 'Eric' },
    { name: 'Tomas'},
    { name: 'Anna'},
    { name: 'Robert'}
  ]
}

hbs.registerPartials(__dirname + '/views');

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.render('index', dummy);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
