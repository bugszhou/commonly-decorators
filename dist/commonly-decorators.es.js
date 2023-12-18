import freezeClick from 'freeze-click';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function freeze(maxTimeout) {
    if (maxTimeout === void 0) { maxTimeout = 10000; }
    return function closureFn(target, property, descriptor) {
        var fn = descriptor.value;
        descriptor.value = freezeClick(function newFn(fc) {
            var opts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                opts[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, fn.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            e_1 = _a.sent();
                            throw e_1;
                        case 3:
                            fc.cancel();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }, maxTimeout);
    };
}

function Assemble(key, constructor, constructorArgs) {
    return function closureFn(target, property) {
        var fn = target[key];
        if (typeof fn !== "function" && typeof (fn === null || fn === void 0 ? void 0 : fn.then) !== "function") {
            target[key] = function newFn() {
                var opts = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    opts[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var args;
                    return __generator(this, function (_a) {
                        try {
                            args = (opts[0] ? constructorArgs === null || constructorArgs === void 0 ? void 0 : constructorArgs.map(function (item) { return opts[0][item]; }) : []) ||
                                [];
                            this[property] = new (constructor.bind.apply(constructor, __spreadArray([void 0], args, false)))();
                        }
                        catch (e) {
                            console.error(e);
                        }
                        return [2 /*return*/];
                    });
                });
            };
            return;
        }
        target[key] = function newFn() {
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var args, result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            args = (opts[0] ? constructorArgs === null || constructorArgs === void 0 ? void 0 : constructorArgs.map(function (item) { return opts[0][item]; }) : []) || [];
                            this[property] = new (constructor.bind.apply(constructor, __spreadArray([void 0], args, false)))();
                            return [4 /*yield*/, fn.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            e_1 = _a.sent();
                            throw e_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
}
function AssembleValue(key, value) {
    return function closureFn(target, property) {
        var fn = target[key];
        if (typeof fn !== "function" && typeof (fn === null || fn === void 0 ? void 0 : fn.then) !== "function") {
            target[key] = function newFn() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            this[property] = value;
                        }
                        catch (e) {
                            console.error(e);
                        }
                        return [2 /*return*/];
                    });
                });
            };
            return;
        }
        target[key] = function newFn() {
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this[property] = value;
                            return [4 /*yield*/, fn.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            e_2 = _a.sent();
                            throw e_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-08-19 16:51:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-09-08 21:01:35
 * @Description 统一返回格式
 */
/**
 * 统一返回格式
 */
var ReturnData = /** @class */ (function () {
    function ReturnData(status, data, msg) {
        if (data === void 0) { data = null; }
        if (msg === void 0) { msg = "success"; }
        this.msg = "";
        this.extraData = null;
        this.status = status;
        this.data = data;
        this.msg = msg;
    }
    ReturnData.prototype.getStatus = function () {
        return this.status;
    };
    ReturnData.prototype.getData = function () {
        return this.data;
    };
    ReturnData.prototype.getMsg = function () {
        return this.msg;
    };
    ReturnData.prototype.setMsg = function (msg) {
        this.msg = msg;
    };
    ReturnData.prototype.getExtraData = function () {
        return this.extraData;
    };
    ReturnData.prototype.setExtraData = function (data) {
        this.extraData = data;
    };
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    ReturnData.isOk = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "ok";
    };
    ReturnData.isFail = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "fail";
    };
    ReturnData.isDeny = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "deny";
    };
    /**
     * 判断data是不是null或者undefined
     * @param param
     * @returns
     */
    ReturnData.hasData = function (param) {
        if (!param || typeof param.getData !== "function") {
            return false;
        }
        var data = param.getData();
        return !(typeof data === "undefined" || data === null);
    };
    /**
     * 是否是网络错误
     * @param data
     * @returns
     */
    ReturnData.isNetWorkError = function (data) {
        return ((ReturnData.getStatusIsFunction(data) &&
            data.getStatus() === "NETWORK_ERROR") ||
            (data === null || data === void 0 ? void 0 : data.status) === "NETWORK_ERROR");
    };
    /**
     * 覆盖原有的逻辑
     * @param data
     * @returns
     */
    ReturnData.cover = function (keyName, value) {
        ReturnData[keyName] = value;
    };
    /**
     * 返回成功
     * @param data
     * @returns ReturnData
     */
    ReturnData.success = function (data) {
        return new ReturnData("ok", data);
    };
    /**
     * 返回失败
     * @returns ReturnData
     */
    ReturnData.fail = function (msg) {
        var data = new ReturnData("fail", null);
        data.setMsg(msg || "");
        return data;
    };
    /**
     * 统一异常处理
     * @param {IReturnData} ex
     * @returns
     */
    ReturnData.exception = function (ex) {
        return new ReturnData(ex.getStatus(), ex.getData(), ex.getMsg());
    };
    /**
     * 返回拒绝
     * @returns ReturnData
     */
    ReturnData.deny = function (msg) {
        return new ReturnData("deny", null, msg || "");
    };
    /**
     * 网络异常返回类
     * @returns ReturnData
     */
    ReturnData.networkError = function (msg) {
        return new ReturnData("NETWORK_ERROR", null, msg || "网络异常，请重试");
    };
    /**
     * 中断类
     * @returns ReturnData
     */
    ReturnData.interrupt = function (msg) {
        return new ReturnData("INTERRUPT", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是中断返回
     * @param data
     * @returns
     */
    ReturnData.isInterrupt = function (data) {
        return ReturnData.getStatusValue(data) === "INTERRUPT";
    };
    /**
     * 取消返回类
     * @returns ReturnData
     */
    ReturnData.cancel = function (msg) {
        return new ReturnData("CANCEL", null, msg || "网络异常，请重试");
    };
    /**
     * 是否是取消返回
     * @param data
     * @returns
     */
    ReturnData.isCancel = function (data) {
        return ReturnData.getStatusValue(data) === "CANCEL";
    };
    /**
     * 顶级错误类
     * @returns ReturnData
     */
    ReturnData.error = function (msg) {
        return new this("ERROR", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是顶级错误
     * @param data
     * @returns
     */
    ReturnData.isError = function (data) {
        return ReturnData.getStatusValue(data) === "ERROR";
    };
    ReturnData.getStatusIsFunction = function (param) {
        return param && typeof param.getStatus === "function";
    };
    ReturnData.getStatusValue = function (obj) {
        var _a;
        if (ReturnData.getStatusIsFunction(obj)) {
            return obj.getStatus();
        }
        return (_a = obj === null || obj === void 0 ? void 0 : obj.status) !== null && _a !== void 0 ? _a : "";
    };
    return ReturnData;
}());
function getStatusIsFunction(param) {
    return param && typeof param.getStatus === "function";
}

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
                            if (ReturnData.isOk(result)) {
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
            var _a, _b, _c;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            (_b = (_a = this === null || this === void 0 ? void 0 : this.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
                                clearTimeout(item);
                            });
                            this.__polling__list__[pollingId] = null;
                            return [4 /*yield*/, ((_c = originOnUnload === null || originOnUnload === void 0 ? void 0 : originOnUnload.apply) === null || _c === void 0 ? void 0 : _c.call(originOnUnload, this, opts))];
                        case 1:
                            result = _d.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
    };
}
function PollingAfter(intervalTime, pollingId) {
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
                var timer;
                var _this = this;
                return __generator(this, function (_a) {
                    timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    this.__polling__list__[pollingId] = (_b = (_a = this.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return item !== timer; });
                                    clearTimeout(timer);
                                    return [4 /*yield*/, originFn.apply(this, opts)];
                                case 1:
                                    result = _c.sent();
                                    if (ReturnData.isOk(result)) {
                                        resolve(result);
                                        return [2 /*return*/];
                                    }
                                    fn.apply(this, opts);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, intervalTime);
                    this.__polling__list__[pollingId].push(timer);
                    return [2 /*return*/];
                });
            }); });
        };
        var originOnUnload = target === null || target === void 0 ? void 0 : target.onUnload;
        target.onUnload = function newOnUnload() {
            var _a, _b, _c, _d;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            (_b = (_a = this === null || this === void 0 ? void 0 : this.__polling__list__) === null || _a === void 0 ? void 0 : _a[pollingId]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
                                clearTimeout(item);
                            });
                            if ((_c = this === null || this === void 0 ? void 0 : this.__polling__list__) === null || _c === void 0 ? void 0 : _c[pollingId]) {
                                this.__polling__list__[pollingId] = null;
                            }
                            return [4 /*yield*/, ((_d = originOnUnload === null || originOnUnload === void 0 ? void 0 : originOnUnload.apply) === null || _d === void 0 ? void 0 : _d.call(originOnUnload, this, opts))];
                        case 1:
                            result = _e.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
    };
}
function pollingClear(content, pollingId) {
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
function pollingClearAll(content) {
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
                    pollingClearAll(_this);
                }, function () {
                    pollingClearAll(_this);
                });
            }
            pollingClearAll(this);
            return originResult;
        };
    };
}

var miniprogram = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Polling: Polling,
    Assemble: Assemble,
    AssembleValue: AssembleValue,
    PollingAfter: PollingAfter,
    pollingClear: pollingClear,
    pollingClearAll: pollingClearAll,
    PollingClearAllDeco: PollingClearAllDeco
});

function Required(errMsg, propertyPath) {
    if (propertyPath === void 0) { propertyPath = ""; }
    return function _required(target, property, parameterIndex) {
        if (!(target === null || target === void 0 ? void 0 : target.__requiredData)) {
            target.__requiredData = new Map();
        }
        target.__requiredData.set(property, {
            index: parameterIndex,
            errMsg: errMsg,
            propertyPath: propertyPath,
        });
    };
}
var ParameterDecoratorError = /** @class */ (function (_super) {
    __extends(ParameterDecoratorError, _super);
    function ParameterDecoratorError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.__id = "ParameterDecoratorError";
        _this.status = "PARAM_ERROR";
        _this.data = null;
        _this.from = "CheckParamRequired";
        return _this;
    }
    ParameterDecoratorError.prototype.setData = function (val) {
        this.data = val;
    };
    ParameterDecoratorError.prototype.getData = function () {
        return this.data;
    };
    ParameterDecoratorError.prototype.setStatus = function (status) {
        this.status = status;
    };
    ParameterDecoratorError.prototype.getStatus = function () {
        return this.status;
    };
    ParameterDecoratorError.prototype.setFrom = function (from) {
        this.from = from;
    };
    ParameterDecoratorError.prototype.getFrom = function () {
        return this.from;
    };
    ParameterDecoratorError.isParameterDecoratorError = function (obj) {
        return (obj instanceof ParameterDecoratorError ||
            (obj === null || obj === void 0 ? void 0 : obj.__id) === new ParameterDecoratorError("").__id);
    };
    return ParameterDecoratorError;
}(Error));
function CheckParamRequired(target, property, propertyDescriptor) {
    var originalFn = propertyDescriptor.value;
    propertyDescriptor.value = function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var requiredData, requiredInfo, index, propertyPath, propertyPaths, val, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requiredData = target === null || target === void 0 ? void 0 : target.__requiredData;
                        requiredInfo = requiredData.get(property);
                        index = Number(requiredInfo === null || requiredInfo === void 0 ? void 0 : requiredInfo.index);
                        propertyPath = requiredInfo === null || requiredInfo === void 0 ? void 0 : requiredInfo.propertyPath;
                        propertyPaths = (propertyPath === null || propertyPath === void 0 ? void 0 : propertyPath.split(".")) || [];
                        val = propertyPaths.reduce(function (pre, pathKey) {
                            if (typeof pre === "undefined" || pre === null) {
                                return pre;
                            }
                            if ((!pathKey && pathKey !== 0) || pathKey === ".") {
                                return pre;
                            }
                            return pre === null || pre === void 0 ? void 0 : pre[pathKey];
                        }, opts === null || opts === void 0 ? void 0 : opts[index]);
                        if (!isNaN(index) &&
                            (typeof val === "undefined" || val === "" || val === null)) {
                            throw new ParameterDecoratorError((requiredInfo === null || requiredInfo === void 0 ? void 0 : requiredInfo.errMsg) || "\u7B2C".concat(index + 1, "\u4E2A\u53C2\u6570\u5FC5\u4F20"));
                        }
                        return [4 /*yield*/, originalFn.apply(this, opts)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
}
var param = {
    Required: Required,
    CheckParamRequired: CheckParamRequired,
    ParameterDecoratorError: ParameterDecoratorError,
};

var index = {
    freeze: freeze,
    miniprogram: miniprogram,
};

export { Assemble, AssembleValue, param as ParamDecorator, Polling, PollingAfter, PollingClearAllDeco, index as default, freeze, pollingClear, pollingClearAll };
//# sourceMappingURL=commonly-decorators.es.js.map
