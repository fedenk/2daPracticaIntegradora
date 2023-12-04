import Router from './router.js';
import Products from '../dao/dbManagers/products.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';


export default class ProductsRouter extends Router{
    constructor(){ 
        super();
        this.productsManager = new Products();
    }

    init() {
        this.get('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.getAll)
        this.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.save)
    }

    async getAll(req,res) {
        try {
            const products = await this.productsManager.getAll();
            res.sendSuccess(products);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async save(req,res) {
        try {
            const { title, description, code, price, status, stock, category, image } = req.body;
    
            if( !title || !description || !code || !price || !status || !stock || ! category || !image ) {
                return res.sendClientError('Incomplete Values')
            }
    
            const result = await this.productsManager.save({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                image
            });
    
            return res.sendSuccessNewResource(result);
        } catch (error) {
            return res.sendClientError('Error');
        }
    }
}





