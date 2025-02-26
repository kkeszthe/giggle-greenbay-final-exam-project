import express from 'express';
import path from 'path';
import morgan from 'morgan';

import { api, system } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(express.static(path.join(__dirname, 'static/')));
app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/system', system);

app.use(errorHandler);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

export default app;
