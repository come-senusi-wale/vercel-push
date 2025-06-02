"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatus = exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType["Athlete"] = "Athlete";
    AccountType["Scout"] = "Scout";
})(AccountType || (exports.AccountType = AccountType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Active"] = "Active";
    AccountStatus["Pending"] = "Pending";
    AccountStatus["Inactive"] = "Inactive";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
