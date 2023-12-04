import express from 'express';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import UsersRouter from './routes/users.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import initializePassport from './config/passport.js';
import passport from 'passport';

const app = express();

const viewsRouter = new ViewsRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter.getRouter);
app.use('/api/products', productsRouter.getRouter);
app.use('/api/carts', cartsRouter.getRouter);
app.use('/api/users', usersRouter.getRouter);

try {
    await mongoose.connect('mongodb+srv://fedenkoptv:86VUQzMmgjkJQ26Z@cluster55575fgs.es4ndyh.mongodb.net/desafioEntregable6?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

app.listen(8080, () => console.log('Server running'));