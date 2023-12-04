import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import Products from '../dao/dbManagers/products.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';

export default class ViewsRouter extends Router {
    constructor() {
        super();
        this.cartsManager = new Carts();
        this.productsManager = new Products();
    }

    init() {
        this.get('/products-view',[accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.productsView);
        this.get('/carts-view',[accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.cartsView);
    }

    async productsView(req,res) {
        try {
            const products = await this.productsManager.getAll();
            res.render('products', { products });
        } catch (error) {
            res.SendServerError(error.message);
        }
    }

    async cartsView(req,res) {
        try {
            const carts = await this.cartsManager.getAll();
            res.render('carts', { carts });
        } catch (error) {
            res.SendServerError(error.message);
        }
    }
}