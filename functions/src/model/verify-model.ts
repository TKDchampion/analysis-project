import { ErrorContent } from "../view-model/error-viewmodel";

const jwt = require('jsonwebtoken');

class VerifyModel {

    public account: string = '';
    public password: string = '';

    public verifyUser(req: any, ftn: Function) {
        return jwt.verify(req.header('Authorization').replace('Bearer ', ''), 'shhhhh',
            (error: { message: any; }, decoded: any) => {
                if (error) {
                    return this.formatResultErrorFn;
                }

                if (decoded.account) {
                    return ftn
                } else {
                    return this.formatResultErrorFn;
                }
            })
    }

    public verifyCounts(req: any, ftn: Function) {
        return jwt.verify(req.header('Authorization').replace('Bearer ', ''), 'shhhhh',
            (error: { message: any; }, decoded: any) => {
                if (error) {
                    return this.formatResultErrorFn;
                }

                if (decoded.counts >= 0) {
                    return ftn
                } else {
                    return this.formatResultErrorFn;
                }
            })
    }

    public verifyContain(req: any, ftn: Function) {
        return jwt.verify(req.header('Authorization').replace('Bearer ', ''), 'shhhhh',
            (error: { message: any; }, decoded: any) => {
                if (error) {
                    return this.formatResultErrorFn;
                }

                if (decoded.account) {
                    return this.getToken(req);
                } else {
                    return this.formatResultErrorFn;
                }
            })
    }

    public getToken(req: any) {
        return jwt.verify(req.header('Authorization').replace('Bearer ', ''), 'shhhhh')
    }

    private formatResultErrorFn = (result: any) => {
        return { message: 'user unauthorized', errorStatus: 401 } as ErrorContent;
    }
}

export const verify = new VerifyModel();