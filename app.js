import express from 'express'
import index_router from './src/routes/index_router.js'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

const app = express();

app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false })); // Puse este y ahi si pasaron los datos del form al post.

app.use('/', index_router);
// View engine
app.set('views', './src/views');
app.set('view engine', 'pug');

export default app
