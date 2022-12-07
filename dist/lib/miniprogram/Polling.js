"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.PollingClearAllDeco = exports.PollingClearAll = exports.PollingClear = void 0;
var return_data_1 = require("return-data");
function Polling(intervalTime, pollingId) {
    if (intervalTime === void 0) { intervalTime = 1000; }
    if (pollingId === void 0) { pollingId = "__polling__"; }
    return function closurePolling(target, property, descriptor) {
        var originFn = descriptor.value;
        descriptor.value = function fn() {
            var _this = this;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            if (!this.__polling__list__) {
                this.__polling__list__ = Object.create(null);
            }
            if (!this.__polling__list__[pollingId]) {
                this.__polling__list__[pollingId] = [];
            }
            if (!Array.isArray(this.__polling__list__[pollingId])) {
                this.__polling__list__[pollingId] = [this.__polling__list__[pollingId]];
            }
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var result, timer;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originFn.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            if (return_data_1.default.isOk(result)) {
                                resolve(result);
                                return [2 /*return*/];
                            }
                            timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    this.__polling__list__[pollingId] = (_b = (_a = this.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return item !== timer; });
                                    clearTimeout(timer);
                                    fn.apply(this, opts);
                                    return [2 /*return*/];
                                });
                            }); }, intervalTime);
                            this.__polling__list__[pollingId].push(timer);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        var originOnUnload = target.onUnload;
        target.onUnload = function newOnUnload() {
            var _a, _b;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            (_b = (_a = this === null || this === void 0 ? void 0 : this.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
                                clearTimeout(item);
                            });
                            this.__polling__list__[pollingId] = null;
                            return [4 /*yield*/, originOnUnload.apply(this, opts)];
                        case 1:
                            result = _c.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
    };
}
exports.default = Polling;
function PollingClear(content, pollingId) {
    var _a, _b;
    if (pollingId === void 0) { pollingId = "__polling__"; }
    try {
        (_b = (_a = content.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
            clearTimeout(item);
        });
        content.__polling__list__[pollingId] = null;
    }
    catch (e) {
        console.error(e);
    }
}
exports.PollingClear = PollingClear;
function PollingClearAll(content) {
    try {
        Object.keys((content === null || content === void 0 ? void 0 : content.__polling__list__) || {}).forEach(function (pollingId) {
            var _a, _b, _c;
            (_b = (_a = content === null || content === void 0 ? void 0 : content.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
                clearTimeout(item);
            });
            clearTimeout((_c = content === null || content === void 0 ? void 0 : content.__polling__list__) === null || _c === void 0 ? void 0 : _c[pollingId]);
            content.__polling__list__[pollingId] = null;
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.PollingClearAll = PollingClearAll;
function PollingClearAllDeco() {
    return function closurePollingClearAllDeco(target, property, descriptor) {
        var originFn = descriptor.value;
        descriptor.value = function fn() {
            var _this = this;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            var originResult = originFn.apply(this, opts);
            if (typeof originResult === "object" &&
                typeof (originResult === null || originResult === void 0 ? void 0 : originResult.then) === "function") {
                return originResult.then(function () {
                    PollingClearAll(_this);
                }, function () {
                    PollingClearAll(_this);
                });
            }
            PollingClearAll(this);
            return originResult;
        };
    };
}
exports.PollingClearAllDeco = PollingClearAllDeco;
//# sourceMappingURL=Polling.js.map