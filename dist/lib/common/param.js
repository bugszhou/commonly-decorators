"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CheckParamRequired = exports.ParameterDecoratorError = exports.Required = void 0;
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
exports.Required = Required;
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
exports.ParameterDecoratorError = ParameterDecoratorError;
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
exports.CheckParamRequired = CheckParamRequired;
exports.default = {
    Required: Required,
    CheckParamRequired: CheckParamRequired,
    ParameterDecoratorError: ParameterDecoratorError,
};
//# sourceMappingURL=param.js.map