"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStatus = exports.AdminRole = void 0;
var AdminRole;
(function (AdminRole) {
    AdminRole["SuperAdmin"] = "Super Admin";
    AdminRole["ContentManager"] = "Content Manager";
    AdminRole["SupportAgent"] = "Support Agent";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
var AdminStatus;
(function (AdminStatus) {
    AdminStatus["Active"] = "active";
    AdminStatus["Suspended"] = "suspended";
})(AdminStatus || (exports.AdminStatus = AdminStatus = {}));
