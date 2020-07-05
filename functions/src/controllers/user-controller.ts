import { Request, Response } from "express";
import { userModel } from "../model/user-model"

class UserController {
    //取得所有會員
    getAllAccounts(req: Request, res: Response) {
        const result = userModel.getAllAccounts(req)
        result.then((response: any) => res.send(response))
            // .catch((error: any) => res.status(500).send(error))
    }

    login(req: Request, res: Response) {
        const result = userModel.login(req)
        result.then((response: any) => res.send(response))
    }
}

export const userController = new UserController();