import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";
import { verify } from "./verify-model";

class PlayerModel {
    public getPlayersList(req: any) {

        const reference = db.collection('playersList').doc('list');
        const formatResultFn = (result: any) => { return result.data() };
        const asyncData = dataBase.get({ reference: reference }, verify.verifyUser(req, formatResultFn));
        return asyncData;
    }

    
}

export const playerModel = new PlayerModel();