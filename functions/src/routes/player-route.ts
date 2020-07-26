import Route from "../router/route";
import { playerController } from "../controllers/player-controller";

export class PlayerRoute extends Route {
    constructor() {
        super();
        this.prefix = '';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/getPlayerList', playerController.getPlayersList);
        this.router.get('/getPlayerListId', playerController.getPlayersListId);
        this.router.post('/getPlayersListAnalysisId', playerController.getPlayersListAnalysisId);
        this.router.get('/getPlayerMessagesId', playerController.getPlayerMessagesId);
        this.router.get('/getPlayerMessagesReplyId', playerController.getPlayerMessagesReplyId);
    }
}