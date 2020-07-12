import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";

class PlayerModel {
    public getPlayersList(req: any) {
        const reference = db.collection('playersList').doc('list');
        const formatResultFn = (result: any) => { return result.data() };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    // const asyncData = dataBase.get({ reference: reference }, verify.verifyUser(req, formatResultFn));
    public getPlayersListId(req: any) {
        const id = req.query.id;
        const reference = db.collection('playersList').doc('winRate');
        const formatResultFn = (result: any) => {
            const filterItem = result.data().teamWinRate.find((i: any) => i.teamId === id);
            const filterItemVs = filterItem.vs.find((i: any) => i.active === true);
            delete filterItemVs.win;
            delete filterItemVs.myWin;
            return filterItemVs;
        };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }


}

export const playerModel = new PlayerModel();