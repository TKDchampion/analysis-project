import { Request, Response } from "express";
import { userModel } from "../model/user-model"

class UserController {
    //取得所有會員
    getAllAccounts(req: Request, res: Response) {
        const result = userModel.getAllAccounts(req)
        result.then((response: any) => res.send(response))
            // .catch((error: any) => res.status(500).send(error))
    }
}

export const userController = new UserController();