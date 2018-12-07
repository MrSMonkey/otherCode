import path from 'path'
import Express from 'express'
import connectHistoryApiFallback from 'connect-history-api-fallback'
const app = new Express();
const port = config.port;
app.use('/',Express.static(path.join(__dirname,"..",'build')));
app.use('/', connectHistoryApiFallback());