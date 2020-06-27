import { db } from "../detabase/setting";
import { dataBase } from "../detabase/db-interface";


class UserModel {
    public getAllAccounts(req: any) {
        const reference = db.collection('users');
        const fights: any[] = [];
        const formatResultFn = (result: any) => {
            result.forEach((doc: any) => {
                fights.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return fights
        }
        const asyncData = dataBase.get({ reference: reference }, formatResultFn);
        return asyncData;
    }
}

export const userModel = new UserModel();