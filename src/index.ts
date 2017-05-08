import * as request from 'request';
import * as jwt from 'jsonwebtoken';

export interface IOptions {
    baseUrl: string,

    serverVerifyKey: string

    clientEncodeKey: string
    clientEncodeKeyPassphrase: string
}
export class AccountsystemSDK {

    baseUrl: string = "";
    serverVerifyKey: string = "";
    clientEncodeKey: string = "";
    clientEncodeKeyPassphrase: string = "";

    constructor(options: IOptions) {
        this.baseUrl = options.baseUrl;
        this.serverVerifyKey = options.serverVerifyKey;
        this.clientEncodeKey = options.clientEncodeKey;
        this.clientEncodeKeyPassphrase = options.clientEncodeKeyPassphrase;
    }

    async amount(account: string): Promise<number> {
        let clientToken = await genKey({}, this.clientEncodeKey, this.clientEncodeKeyPassphrase);
        let result = await post<{ token: string }>(`${this.baseUrl}/amount`, { account, clientToken });
        if (result && result.token) {
            try {
                let decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                return decoded.amount;
            } catch (error) {
                throw new Error('check verifyKey');
            }
        }
        throw new Error('check account system server');
    }

    async accountCreate(unitid: number, app: number): Promise<string> {
        let clientToken = await genKey({ unitid,app }, this.clientEncodeKey, this.clientEncodeKeyPassphrase);
        let result = await post<{ token: string }>(`${this.baseUrl}/account-create`, { unitid, app, clientToken });
        if (result && result.token) {
            try {
                let decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                //console.log('decoded', decoded)
                return decoded.accountid;
            } catch (error) {
                throw new Error('check verifyKey');
            }
        }
        throw new Error('check account system server');
    }

    async accountRefesh(account: string): Promise<number> {
        let clientToken = await genKey({ account }, this.clientEncodeKey, this.clientEncodeKeyPassphrase);
        let result = await post<{ token: string }>(`${this.baseUrl}/account-refresh`, { account, clientToken });
        //console.log('result',result)
        if (result && result.token) {
            try {
                let decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                //console.log('decoded', decoded)
                return decoded.amount;
            } catch (error) {
                //console.log('error',error)
                throw new Error('check verifyKey');
            }
        }
        throw new Error('check account system server');
    }
    async transfer(owneraccount: string, targetaccount: string, amount: number, note: string): Promise<{ amountowner: number, amountarget: number }> {
        let clientToken = await genKey({ owneraccount, targetaccount, amount }, this.clientEncodeKey, this.clientEncodeKeyPassphrase);
        let result = await post<{ token: string }>(`${this.baseUrl}/transfer`, { owneraccount, targetaccount, amount, note, clientToken });
        if (result && result.token) {
            try {
                let decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                return {
                    amountowner: decoded.amountowner,
                    amountarget: decoded.amountarget
                };
            } catch (error) {
                //console.log('error',error)
                throw new Error('check verifyKey');
            }
        }
        throw new Error('check account system server');
    }

    async stock(account: string): Promise<{ newPointId: string }> {
        let clientToken = await genKey({ account }, this.clientEncodeKey, this.clientEncodeKeyPassphrase);
        let result = await post<{ token: string }>(`${this.baseUrl}/stock`, { account, clientToken });
        //console.log('result', result);

        if (result && result.token) {
            try {
                let decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                //console.log('decoded', decoded)
                return {
                    newPointId: decoded.newPointId
                };
            } catch (error) {
                //console.log('error',error)
                throw new Error('check verifyKey');
            }
        }
        throw new Error('check account system server');
    }
}

async function post<T>(url: string, body: Object): Promise<T> {
    let options = {
        method: 'POST',
        url, timeout: 1000 * 5,
        json: body
    };

    return new Promise<T>((resolve, reject) => {
        request(options, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            if (resp.statusCode == 200) {
                return resolve(body);
            };

            reject(body);
        });
    });
}



async function genKey(payload, key, passphrase) {
    return new Promise<string>((resolve, reject) => {
        let jwtkey = { key, passphrase };
        jwt.sign(payload, <any>jwtkey, { algorithm: 'RS512', jwtid: 'accountsystem', expiresIn: '2m' }, (err, encoded) => {
            if (err) return reject(err);
            resolve(encoded)
        });
    });
}