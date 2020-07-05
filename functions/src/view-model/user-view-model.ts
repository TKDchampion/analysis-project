export interface UserInfo {
    account: string;
    password: string;
}

export class UserInfoInstance implements UserInfo {
    account: string = '';
    password: string = '';
    constructor(user: any) {
        this.account = user.account;
        this.password = user.password;
    }
}