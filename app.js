import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import index_router from './src/routes/index_router.js'
import goal_router from './src/routes/goal_router.js'

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use('/', index_router);
app.use('/goals', goal_router);

// View engine
app.set('views', './public/views');
app.set('view engine', 'pug');

export default app
