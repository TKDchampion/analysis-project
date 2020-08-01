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
        this.router.put('/putPlayerMessages', playerController.putPlayerMessages);
        this.router.put('/deletePlayerMessages', playerController.deletePlayerMessages);
        this.router.put('/putPlayerReply', playerController.putPlayerReply);
        this.router.put('/deletePlayerReply', playerController.deletePlayerReply);
        this.router.get('/test', playerController.test);

    }
}