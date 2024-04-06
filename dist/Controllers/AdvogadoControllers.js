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
exports.hashpassword = void 0;
var express_1 = __importDefault(require("express"));
var advogadoModel_js_1 = require("../models/advogadoModel.js");
var bcrypt_1 = require("bcrypt");
var usuarioModel_js_1 = require("../models/usuarioModel.js");
var UsuarioControllers_js_1 = require("./UsuarioControllers.js");
var uuid_1 = require("uuid");
var axios_1 = __importDefault(require("axios"));
var router = express_1.default.Router();
router.get("/getadvogado/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idNumber, dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                idNumber = parseInt(id, 10);
                return [4 /*yield*/, (0, advogadoModel_js_1.GetAdvogado)(idNumber)];
            case 1:
                dados = _a.sent();
                res.status(200).json({ dados: dados });
                return [2 /*return*/];
        }
    });
}); });
router.get("/getadvogado", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, advogadoModel_js_1.AllAdvogado)()];
            case 1:
                dados = _a.sent();
                res.status(200).json({ dados: dados });
                return [2 /*return*/];
        }
    });
}); });
router.post("/createadvogado", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, email, senha, telefone, serie, result, validar, newsenha, uuid, resultSerie, values, dados;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha, telefone = _a.telefone, serie = _a.serie;
                return [4 /*yield*/, (0, usuarioModel_js_1.VerificarEmail)(email, "advogado")];
            case 1:
                result = _b.sent();
                if (!(!result || result.length === 0)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, UsuarioControllers_js_1.Validateall)(nome, email, senha, telefone)];
            case 2:
                validar = _b.sent();
                if (!validar) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, exports.hashpassword)(senha)];
            case 3:
                newsenha = _b.sent();
                uuid = (0, uuid_1.v4)();
                return [4 /*yield*/, axios_1.default.post("http://localhost:9000/verifySerialNumber", { serie: serie })];
            case 4:
                resultSerie = _b.sent();
                console.log(resultSerie.data);
                if (!(resultSerie.data.exists == true)) return [3 /*break*/, 7];
                values = [
                    nome,
                    serie,
                    email,
                    telefone,
                    newsenha,
                    req.body.especializacao,
                    req.body.descricao,
                    req.body.Horarios_Disponiveis,
                    req.body.outras,
                    uuid,
                ];
                return [4 /*yield*/, (0, advogadoModel_js_1.CreateAdvogado)(values)];
            case 5:
                dados = _b.sent();
                return [4 /*yield*/, axios_1.default.post("http://localhost:9000/blockSerialNumber", { serie: serie })
                        .then(function (res) { return console.log(res.data); })
                        .catch(function (err) { return console.log(err); })];
            case 6:
                _b.sent();
                res.status(200).json({ dados: dados });
                return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(200).json({ status: 'Erro! numero de serie invalido' })];
            case 8: return [3 /*break*/, 10];
            case 9: return [2 /*return*/, res.status(200).json({ status: 'Erro! na autenticação' })];
            case 10: return [3 /*break*/, 12];
            case 11: return [2 /*return*/, res.status(200).json({ status: "Advogado Já Cadastrado" })];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.put("/updateadvogado/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idNumber, senha, values, dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                idNumber = parseInt(id, 10);
                return [4 /*yield*/, (0, exports.hashpassword)(req.body.senha)];
            case 1:
                senha = _a.sent();
                values = [
                    req.body.nome,
                    req.body.serie,
                    req.body.email,
                    senha,
                    req.body.especializacao,
                    req.body.Descricao_Profissional,
                    req.body.Outras_Informacoes
                ];
                return [4 /*yield*/, (0, advogadoModel_js_1.UpdateAdvogado)(values, idNumber)];
            case 2:
                dados = _a.sent();
                res.status(200).json({ dados: dados });
                return [2 /*return*/];
        }
    });
}); });
router.delete("/deleteadvogado/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idNumber, dados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                idNumber = parseInt(id, 10);
                return [4 /*yield*/, (0, advogadoModel_js_1.DeleteAdvogado)(idNumber)];
            case 1:
                dados = _a.sent();
                res.status(200).json({ dados: dados });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
var hashpassword = function (senha) { return __awaiter(void 0, void 0, void 0, function () {
    var hashSenha;
    return __generator(this, function (_a) {
        hashSenha = (0, bcrypt_1.hash)(senha, 5);
        return [2 /*return*/, hashSenha];
    });
}); };
exports.hashpassword = hashpassword;
//# sourceMappingURL=AdvogadoControllers.js.map