
import express from "express";
import cors from 'cors'
import advogado from './Controllers/AdvogadoControllers.js'
import Usuarios from './Controllers/UsuarioControllers.js'
//import reuniao from './Controllers/AgendamentoControllers.js'
import login from './Controllers/LoginControllers.js'
const app = express();
const port = 8000;

app.use(cors()) 
app.use(express.json())

app.use(advogado)
app.use(login)
app.use(Usuarios)
//app.use(reuniao)

app.use((_:any, res:any) => {
    res.status(404).send("pagina nao encontrada")
})

app.listen(port, 
    () => console.log(`servidor na porta: http://localhost:${port}`))