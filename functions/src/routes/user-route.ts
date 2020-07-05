import Route from "../router/route";
import { userController } from "../controllers/user-controller";

export class UserRoute extends Route {
    constructor() {
        super();
        this.prefix = '';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/getAllAccounts', userController.getAllAccounts);
        this.router.post('/login', userController.login);
    }
}