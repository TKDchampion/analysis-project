import Route from "../router/route";
import { playerController } from "../controllers/player-controller";

export class PlayerRoute extends Route {
    constructor() {
        super();
        this.prefix = '';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/getPlayerList', playerController.getPlayersList)
    }
}