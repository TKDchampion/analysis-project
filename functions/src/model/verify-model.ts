const jwt = require('jsonwebtoken');

class VerifyModel {

    public account: string = '';
    public password: string = '';

    public verifyToken(req: any) {
        const secretKey = 'shhhhh';
        const token = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
        return token;
    }
}

export const verify = new VerifyModel();