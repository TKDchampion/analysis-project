import { Request, Response } from "express";
import { playerModel } from "../model/player-model";

class PlayerController {
    //取得所有會員
    getPlayersList(req: Request, res: Response) {
        const result = playerModel.getPlayersList(req);
        result.then((response: any) => res.send(response));
    }

    getPlayersListId(req: Request, res: Response) {
        const result = playerModel.getPlayersListId(req);
        result.then((response: any) => res.send(response));
    }

    getPlayersListAnalysisId(req: Request, res: Response) {
        const result = playerModel.getPlayersListAnalysisId(req);
        result.then((response: any) => res.send(response));
    }

    getPlayerMessagesId(req: Request, res: Response) {
        const result = playerModel.getPlayerMessagesId(req);
        result.then((response: any) => res.send(response));
    }

    getPlayerMessagesReplyId(req: Request, res: Response) {
        const result = playerModel.getPlayerMessagesReplyId(req);
        result.then((response: any) => res.send(response));
    }

    putPlayerMessages(req: Request, res: Response) {
        const result = playerModel.putPlayerMessages(req);
        result.then((response: any) => res.send(response));
    }

    deletePlayerMessages(req: Request, res: Response) {
        const result = playerModel.deletePlayerMessages(req);
        result.then((response: any) => res.send(response));
    }

    putPlayerReply(req: Request, res: Response) {
        const result = playerModel.putPlayerReply(req);
        result.then((response: any) => res.send(response));
    }   

    deletePlayerReply(req: Request, res: Response) {
        const result = playerModel.deletePlayerReply(req);
        result.then((response: any) => res.send(response));
    }   

    test(req: Request, res: Response) {
        const result = playerModel.test(req);
        result.then((response: any) => res.send(response));
    }
}

export const playerController = new PlayerController();