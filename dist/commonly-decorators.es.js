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

var miniprogram = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Assemble: Assemble
});

var index = {
    freeze: freeze,
    miniprogram: miniprogram,
};

export { Assemble, index as default, freeze };
//# sourceMappingURL=commonly-decorators.es.js.map
