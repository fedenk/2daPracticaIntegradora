import { productsModel } from './models/products.model.js';

export default class Products {
    constructor() {
        console.log('Working products with DB');
    }

    getAll = async () => {
        const products = await productsModel.find();
        return products.map(product => product.toObject());
    }

    save = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }
}