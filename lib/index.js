"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var jwt = require("jsonwebtoken");
var AccountsystemSDK = (function () {
    function AccountsystemSDK(options) {
        this.baseUrl = "";
        this.serverVerifyKey = "";
        this.clientEncodeKey = "";
        this.clientEncodeKeyPassphrase = "";
        this.baseUrl = options.baseUrl;
        this.serverVerifyKey = options.serverVerifyKey;
        this.clientEncodeKey = options.clientEncodeKey;
        this.clientEncodeKeyPassphrase = options.clientEncodeKeyPassphrase;
    }
    AccountsystemSDK.prototype.amount = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken, result, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({}, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/amount", { account: account, clientToken: clientToken })];
                    case 2:
                        result = _a.sent();
                        if (result && result.token) {
                            try {
                                decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                                return [2 /*return*/, decoded.amount];
                            }
                            catch (error) {
                                throw new Error('check verifyKey');
                            }
                        }
                        throw new Error('check account system server');
                }
            });
        });
    };
    AccountsystemSDK.prototype.accountCreate = function (unitid, app) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken, result, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({ unitid: unitid, app: app }, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/account-create", { unitid: unitid, app: app, clientToken: clientToken })];
                    case 2:
                        result = _a.sent();
                        if (result && result.token) {
                            try {
                                decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                                //console.log('decoded', decoded)
                                return [2 /*return*/, decoded.accountid];
                            }
                            catch (error) {
                                throw new Error('check verifyKey');
                            }
                        }
                        throw new Error('check account system server');
                }
            });
        });
    };
    AccountsystemSDK.prototype.accountRefesh = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken, result, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({ account: account }, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/account-refresh", { account: account, clientToken: clientToken })];
                    case 2:
                        result = _a.sent();
                        //console.log('result',result)
                        if (result && result.token) {
                            try {
                                decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                                //console.log('decoded', decoded)
                                return [2 /*return*/, decoded.amount];
                            }
                            catch (error) {
                                //console.log('error',error)
                                throw new Error('check verifyKey');
                            }
                        }
                        throw new Error('check account system server');
                }
            });
        });
    };
    AccountsystemSDK.prototype.transfer = function (owneraccount, targetaccount, amount, note) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken, result, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({ owneraccount: owneraccount, targetaccount: targetaccount, amount: amount }, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/transfer", { owneraccount: owneraccount, targetaccount: targetaccount, amount: amount, note: note, clientToken: clientToken })];
                    case 2:
                        result = _a.sent();
                        if (result && result.token) {
                            try {
                                decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                                return [2 /*return*/, {
                                        amountowner: decoded.amountowner,
                                        amountarget: decoded.amountarget
                                    }];
                            }
                            catch (error) {
                                //console.log('error',error)
                                throw new Error('check verifyKey');
                            }
                        }
                        throw new Error('check account system server');
                }
            });
        });
    };
    AccountsystemSDK.prototype.transaction = function (account, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({ account: account }, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/transaction", { account: account, clientToken: clientToken, limit: limit || 10 })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountsystemSDK.prototype.stock = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var clientToken, result, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genKey({ account: account }, this.clientEncodeKey, this.clientEncodeKeyPassphrase)];
                    case 1:
                        clientToken = _a.sent();
                        return [4 /*yield*/, post(this.baseUrl + "/stock", { account: account, clientToken: clientToken })];
                    case 2:
                        result = _a.sent();
                        //console.log('result', result);
                        if (result && result.token) {
                            try {
                                decoded = jwt.verify(result.token, this.serverVerifyKey, { algorithms: ['RS512'], jwtId: 'accountsystem' });
                                //console.log('decoded', decoded)
                                return [2 /*return*/, {
                                        newPointId: decoded.newPointId
                                    }];
                            }
                            catch (error) {
                                //console.log('error',error)
                                throw new Error('check verifyKey');
                            }
                        }
                        throw new Error('check account system server');
                }
            });
        });
    };
    return AccountsystemSDK;
}());
exports.AccountsystemSDK = AccountsystemSDK;
function post(url, body) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                method: 'POST',
                url: url, timeout: 1000 * 5,
                json: body
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    request(options, function (err, resp, body) {
                        if (err) {
                            return reject(err);
                        }
                        if (resp.statusCode == 200) {
                            return resolve(body);
                        }
                        ;
                        reject(body);
                    });
                })];
        });
    });
}
function genKey(payload, key, passphrase) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var jwtkey = { key: key, passphrase: passphrase };
                    jwt.sign(payload, jwtkey, { algorithm: 'RS512', jwtid: 'accountsystem', expiresIn: '2m' }, function (err, encoded) {
                        if (err)
                            return reject(err);
                        resolve(encoded);
                    });
                })];
        });
    });
}
//# sourceMappingURL=index.js.map