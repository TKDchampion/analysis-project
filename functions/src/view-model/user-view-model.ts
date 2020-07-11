export interface UserInfo {
    account: string;
    password: string;
    counts: number;
}

export class UserInfoInstance implements UserInfo {
    account: string = '';
    password: string = '';
    counts: number = 0;
    constructor(user: any) {
        this.account = user.account;
        this.password = user.password;
        this.counts = user.counts;
    }
}