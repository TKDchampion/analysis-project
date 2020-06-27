import { DbViewModel } from "../view-model/db-view-model";


class DbInterface {
    get(params: DbViewModel, formatResultFn?: Function) {
        return params.reference.get().then((query: any) => {
            if (formatResultFn) { query = formatResultFn(query) }
            return query;
        });
    }
}

export const dataBase = new DbInterface();


  

