import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";
import { verify } from "./verify-model";
import * as admin from 'firebase-admin';

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
            const list = Object.values(result.data());
            const filterList = list.filter((i: any) => i.team1_id === id || i.team2_id === id);
            filterList.forEach((i: any) => {
                if (i.active) {
                    delete i.team1_winRate;
                    delete i.team2_winRate;
                }
            });
            return filterList.filter((i: any) => i.time === time);
        };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    public getPlayersListAnalysisId(req: any) {
        const id = req.body.id;
        const account = req.body.account;
        const time = req.body.time;
        const game_id = req.body.game_id;
        const reference = db.collection('playersList').doc('winRate');
        const formatResultFn = (result: any) => {
            const list = Object.values(result.data());
            const filterList = list.filter((i: any) => i.team1_id === id || i.team2_id === id);
            const filterItemVs = filterList.find((i: any) => i.active === true);
            return this.getPlayersListAnalysisUser(filterItemVs, account, time, game_id);
        };
        const asyncData = dataBase.get({ reference: reference }, verify.verifyCounts(req, formatResultFn));

        return asyncData;
    }

    private getPlayersListAnalysisUser(item: any, account: string, time: string, game_id: string) {
        const userReference = db.collection('users').doc('user');
        return userReference.get()
            .then((query: any) => {
                const list: any = Object.values(query.data());
                const user = list.find((i: any) => i.account === account);
                if (user.read.time === time) {
                    if(!user.read.active.includes(game_id)){
                        user.counts = user.counts - 1;
                        user.read.active.push(game_id);
                    }
                } else {
                    user.counts = user.counts - 1;
                    user.read.time = time;
                    user.read.active = [game_id];
                }
                const updateObj: any = {};
                updateObj[`user${user.userId}`] = user;
                return userReference.update(updateObj)
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

    public getPlayerMessagesId(req: any) {
        const id = req.query.id;
        const reference = db.collection('playersList').doc('messages');
        const formatResultFn = (result: any) => {
            const teamIdObj = `teamId${id}`
            const filterItemList = result.data()[teamIdObj];
            filterItemList.forEach((element: any) => {
                const replyObj = `replyId${element.replyId}`;
                element.replyConuts = result.data()[replyObj] ? result.data()[replyObj].length : 0;
            });
            filterItemList.sort((a: any, b: any) => { return new Date(a.time) > new Date(b.time) ? -1 : 1; });
            return filterItemList
        };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    public getPlayerMessagesReplyId(req: any) {
        const id = req.query.id;
        const reference = db.collection('playersList').doc('messages');
        const formatResultFn = (result: any) => {
            const replyObj = `replyId${id}`;
            const filterItemList = result.data()[replyObj] ? result.data()[replyObj] : [];
            filterItemList.sort((a: any, b: any) => { return new Date(a.time) > new Date(b.time) ? -1 : 1; });
            return filterItemList;
        };
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }

    public putPlayerMessages(req: any) {
        verify.getToken(req);
        const teamId = req.query.teamId;
        const obj = req.body;
        const reference = db.collection('playersList').doc('messages');
        const teamIdObj = `teamId${teamId}`;
        const setParams: any = {};
        setParams[teamIdObj] = admin.firestore.FieldValue.arrayUnion(obj);
        const asyncData = dataBase.put({ reference: reference, setParams: setParams });
        return asyncData;
    }

    // test(req: any) {
    //     const name = req.body.name;
    //     const reference = db.collection('playersList').doc('test');
    //     const setParams = { "characteristics": admin.firestore.FieldValue.arrayUnion({name}) };
    //     const setParams = { "characteristics": admin.firestore.FieldValue.arrayRemove(test) };
    //     const asyncData = dataBase.put({ reference: reference, setParams: setParams });
    //     return asyncData;
    // }

    test(req: any) {
        const reference = db.collection('playersList').doc('test');
        const setParams = {
            test1: {
                age: 456,
                name: 123
            }
        }
        const asyncData = dataBase.put({ reference: reference, setParams });
        return asyncData;
    }
}

export const playerModel = new PlayerModel();