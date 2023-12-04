import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';


export default class CoursesRouter extends Router{
    constructor(){ 
        super();
        this.cartsManager = new Carts ();
    }

    init() {
        this.get('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.getAll)
        this.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.save)
    }

    async getAll(req,res) {
        try {
            const carts = await this.cartsManager.getAll();
            res.sendSuccess(carts);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async save(req,res) {
        try {
            const cart = await this.cartsManager.save();
            return res.sendSuccessNewResource(cart);
        } catch (error) {
            return res.sendClientError('Error')
        }
    }
}

