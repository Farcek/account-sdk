export interface IOptions {
    baseUrl: string;
    serverVerifyKey: string;
    clientEncodeKey: string;
    clientEncodeKeyPassphrase: string;
}
export interface IResult {
    at: Date;
    account: string;
    credit: number;
    debit: number;
    note: string;
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
    transaction(account: string, limit?: number): Promise<IResult[]>;
    stock(account: string): Promise<{
        newPointId: string;
    }>;
}
