import { Request, Response } from "express";
import { playerModel } from "../model/player-model";

class PlayerController {
    //取得所有會員
    getPlayersList(req: Request, res: Response) {
        const result = playerModel.getPlayersList(req)
        result.then((response: any) => res.send(response))
            // .catch((error: any) => res.status(500).send(error))
    }
}

export const playerController = new PlayerController();