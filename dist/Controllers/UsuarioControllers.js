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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateNumber = exports.Validatepass = exports.ValidateEmail = exports.ValidateName = exports.Validateall = void 0;
var express_1 = __importDefault(require("express"));
var usuarioModel_js_1 = require("../models/usuarioModel.js");
var AdvogadoControllers_js_1 = require("./AdvogadoControllers.js");
var axios_1 = __importDefault(require("axios"));
var uuid_1 = require("uuid");
var router = express_1.default.Router();
router.get("/getuser", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, usuarioModel_js_1.GetUsers)()];
            case 1:
                dados = _a.sent();
                return [2 /*return*/, res.status(200).json({ dados: dados })];
        }
    });
}); });
router.get("/getuser/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, usuarioModel_js_1.GetUsersId)(id)];
            case 1:
                dados = _a.sent();
                return [2 /*return*/, res.status(200).json({ dados: dados })];
        }
    });
}); });
router.post("/createuser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, nome, telefone, senha, result, validar, uuid, newsenha, values, dados;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, nome = _a.nome, telefone = _a.telefone, senha = _a.senha;
                return [4 /*yield*/, (0, usuarioModel_js_1.VerificarEmail)(email, "usuario")];
            case 1:
                result = _b.sent();
                if (!(!result || result.length === 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, exports.Validateall)(nome, email, senha, telefone)];
            case 2:
                validar = _b.sent();
                if (!validar) return [3 /*break*/, 5];
                uuid = (0, uuid_1.v4)();
                return [4 /*yield*/, (0, AdvogadoControllers_js_1.hashpassword)(req.body.senha)];
            case 3:
                newsenha = _b.sent();
                values = [
                    nome,
                    email,
                    newsenha,
                    telefone,
                    uuid
                ];
                return [4 /*yield*/, (0, usuarioModel_js_1.createUsers)(values)];
            case 4:
                dados = _b.sent();
                return [2 /*return*/, res.status(200).json({ dados: dados })];
            case 5: return [2 /*return*/, res.status(200).json({ status: 'Erro! na autenticação' })];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(200).json({ status: "usuario Já Cadastrado" })];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
var Validateall = function (nome, email, senha, telefone) { return __awaiter(void 0, void 0, void 0, function () {
    var isName, isPass, isNumber, isEmail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.ValidateName)(nome)];
            case 1:
                isName = _a.sent();
                console.log(isName);
                return [4 /*yield*/, (0, exports.Validatepass)(senha)];
            case 2:
                isPass = _a.sent();
                console.log(isPass);
                return [4 /*yield*/, (0, exports.ValidateNumber)(telefone)];
            case 3:
                isNumber = _a.sent();
                console.log(isNumber);
                return [4 /*yield*/, (0, exports.ValidateEmail)(email)];
            case 4:
                isEmail = _a.sent();
                console.log(isEmail);
                return [2 /*return*/, isNumber && isName && isPass && isEmail];
        }
    });
}); };
exports.Validateall = Validateall;
var ValidateName = function (nome) { return __awaiter(void 0, void 0, void 0, function () {
    var regexNome;
    return __generator(this, function (_a) {
        if (nome.length < 3) {
            return [2 /*return*/, false];
        }
        regexNome = /^[a-zA-Z\s]+$/;
        return [2 /*return*/, regexNome.test(nome)];
    });
}); };
exports.ValidateName = ValidateName;
var ValidateEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var regex;
    return __generator(this, function (_a) {
        regex = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-z]{2,6}$/i;
        return [2 /*return*/, regex.test(email)];
    });
}); };
exports.ValidateEmail = ValidateEmail;
var Validatepass = function (senha) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (senha.length < 6) {
            return [2 /*return*/, false];
        }
        return [2 /*return*/, true];
    });
}); };
exports.Validatepass = Validatepass;
var ValidateNumber = function (telefone) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedPhoneNumber, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (telefone.length < 7) {
                    return [2 /*return*/, false];
                }
                if (!telefone) return [3 /*break*/, 3];
                return [4 /*yield*/, formatPhoneNumber(telefone)];
            case 1:
                formattedPhoneNumber = _a.sent();
                console.log(formattedPhoneNumber); // Saída: +244935699190
                return [4 /*yield*/, validatePhoneNumber(formattedPhoneNumber)
                        .then(function (data) {
                        if (data) {
                            console.log('Mensagem:', data.message);
                            if (data.message == "This is an Angola valid phone number") {
                                return true;
                            }
                        }
                        else {
                            console.log('Não foi possível obter os dados.');
                            return false;
                        }
                    })
                        .catch(function (error) {
                        console.error('Ocorreu um erro:', error);
                        return false;
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.ValidateNumber = ValidateNumber;
function validatePhoneNumber(phoneNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var response, erro_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://angolaapi.onrender.com/api/v1/validate/phone/".concat(phoneNumber))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    erro_1 = _a.sent();
                    console.error('Ocorreu um erro ao fazer a requisição:', erro_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function formatPhoneNumber(number) {
    return __awaiter(this, void 0, void 0, function () {
        var cleanedNumber, startsWith244, startsWithPlus244, formattedNumber;
        return __generator(this, function (_a) {
            cleanedNumber = number.replace(/\D/g, '');
            startsWith244 = /^244/.test(cleanedNumber);
            startsWithPlus244 = /^\+244/.test(cleanedNumber);
            formattedNumber = cleanedNumber;
            if (!startsWith244 && !startsWithPlus244) {
                formattedNumber = '+244' + cleanedNumber;
            }
            return [2 /*return*/, formattedNumber];
        });
    });
}
//# sourceMappingURL=UsuarioControllers.js.map