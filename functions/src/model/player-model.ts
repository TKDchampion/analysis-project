import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";
import { verify } from "./verify-model";

class PlayerModel {
    public getPlayersList(req: any) {
        const reference = db.collection('playersList').doc('list');
        const formatResultFn = (result: any) => { return result.data() };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    public getPlayersListId(req: any) {
        const id = req.query.id;
        const time = req.query.time;
        const reference = db.collection('playersList').doc('winRate');
        const formatResultFn = (result: any) => {
            const filterItem = result.data().teamWinRate.find((i: any) => i.teamId === id);
            filterItem.vs.forEach((i: any) => {
                if (i.active) {
                    delete i.win;
                    delete i.myWin;
                }
            });
            filterItem.vs = filterItem.vs.filter((i: any) => i.time === time);
            return filterItem
        };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    public getPlayersListAnalysisId(req: any) {
        const id = req.body.id;
        const account = req.body.account;
        const time = req.body.time;
        const vsId = req.body.vsId;
        const reference = db.collection('playersList').doc('winRate');
        const formatResultFn = (result: any) => {
            const filterItem = result.data().teamWinRate.find((i: any) => i.teamId === id);
            const filterItemVs = filterItem.vs.find((i: any) => i.active === true);
            return this.getPlayersListAnalysisUser(filterItemVs, account, time, vsId);
        };
        const asyncData = dataBase.get({ reference: reference }, verify.verifyCounts(req, formatResultFn));
        return asyncData;
    }

    private getPlayersListAnalysisUser(item: any, account: string, time: string, vsId: string) {
        const userReference = db.collection('users').doc('user');
        return userReference.get()
            .then((query: any) => {
                let list = query.data().member;
                const index = list.findIndex((i: any) => i.account === account);
                const user = list.find((i: any) => i.account === account);
                if (user.read.time === time) {
                    if (user.read.active.includes(vsId)) {
                        list = list
                    } else {
                        list[index].counts = user.counts - 1;
                        list[index].read.active.push(vsId);
                    }
                } else {
                    list[index].counts = user.counts - 1;
                    list[index].read.time = time;
                    list[index].read.active = [vsId];
                }
                return userReference.set({ member: list }, { merge: true })
                    .then(function () {
                        console.log("Document successfully written!");
                        return item
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch(function (error) {
                console.error("Error read document: ", error);
            });
    }



}

export const playerModel = new PlayerModel();