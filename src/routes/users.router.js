import Router from './router.js';
import Users from '../dao/dbManagers/users.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';

export default class UsersRouter extends Router{
    constructor(){ 
        super();
        this.usersManager = new Users ();
    }

    init() {
        this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.login);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.register);
    }

    async register(req,res) {
        try {
            const { first_name, last_name,role,email,password } = req.body;

            if(!first_name || !last_name || !role || !email || !password){
                return res.sendClientError('Incomplete Values');
            }

            const existUser = await this.usersManager.getByEmail(email);

            if(existUser){
                return res.sendClientError('User already Exist');
            }

            const hashedPassword = createHash(password);

            const newUser = {
                ...req.body
            }

            newUser.password = hashedPassword;

            const result = await this.usersManager.save(newUser);
            return sendSuccessNewResource(result);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async login(req,res) {
        try {
            const { email,password } = req.body;

            if(!email || !password){
                return res.sendClientError('Incomplete Values');
            }

            const user = await this.usersManager.getByEmail(email);

            if(!user){
                return res.sendClientError('Incorrect credentials');
            }

            const comparePassword = isValidPassword(password, user.password)
            if(!comparePassword){
                return res.sendClientError('Incorrect credentials');
            }

            const accesToken = generateToken(user);


            res.sendSuccessNewResource(accesToken);
            
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
    
};
