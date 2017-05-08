export interface IOptions {
    baseUrl: string;
    serverVerifyKey: string;
    clientEncodeKey: string;
    clientEncodeKeyPassphrase: string;
}
export declare class AccountsystemSDK {
    baseUrl: string;
    serverVerifyKey: string;
    clientEncodeKey: string;
    clientEncodeKeyPassphrase: string;
    constructor(options: IOptions);
    amount(account: string): Promise<number>;
    accountCreate(unitid: number, app: number): Promise<string>;
    accountRefesh(account: string): Promise<number>;
    transfer(owneraccount: string, targetaccount: string, amount: number, note: string): Promise<{
        amountowner: number;
        amountarget: number;
    }>;
    stock(account: string): Promise<{
        newPointId: string;
    }>;
}
