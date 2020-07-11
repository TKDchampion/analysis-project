import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";
import { verify } from "./verify-model";
import { ErrorContent } from "../view-model/error-viewmodel";

class PlayerModel {
    public getPlayersList(req: any) {
        const reference = db.collection('playersList').doc('list');
        const asyncData = dataBase.get({ reference: reference }, this.verifyFtn(req));
        return asyncData;
    }

    private verifyFtn(req: any){
        const formatResultFn = (result: any) => {
            const userVerify = verify.verifyToken(req);
            if (userVerify.counts > 0) {
                return result.data()
                // return userVerify
            }
            return { message: 'user unauthorized', errorStatus: 401 } as ErrorContent;
        }
        return formatResultFn;
    }
}

export const playerModel = new PlayerModel();