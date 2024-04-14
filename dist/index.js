"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var AdvogadoControllers_js_1 = __importDefault(require("./Controllers/AdvogadoControllers.js"));
var UsuarioControllers_js_1 = __importDefault(require("./Controllers/UsuarioControllers.js"));
//import reuniao from './Controllers/AgendamentoControllers.js'
var LoginControllers_js_1 = __importDefault(require("./Controllers/LoginControllers.js"));
var app = (0, express_1.default)();
var port = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(AdvogadoControllers_js_1.default);
app.use(LoginControllers_js_1.default);
app.use(UsuarioControllers_js_1.default);
//app.use(reuniao)
app.use(function (_, res) {
    res.status(404).send("pagina nao encontrada");
});
app.listen(port, function () { return console.log("servidor na porta: http://localhost:".concat(port)); });
//# sourceMappingURL=index.js.map