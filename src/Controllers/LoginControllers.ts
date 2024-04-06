import { autenticar } from "../models/loginModel.js";
import express,{ Response, Request } from "express";


const app = express.Router()
app.post( "/login", async (req: Request, res: Response) => {

    const { email } = req.body
    const { senha } = req.body
   
    const resultadoUsuario : any = await autenticar(email, senha, "usuario");
console.log(resultadoUsuario);

    if (!resultadoUsuario.erro) {
       
        return res.status(200).json({ status: "Sucess", tipo: "usuario", id: resultadoUsuario });
    } 

    const resultadoAdvogado:any = await autenticar(email, senha, "advogado");
        console.log(resultadoAdvogado);
        
    if (!resultadoAdvogado.erro) {
       
        return res.status(200).json({ status: "Sucess", tipo: "advogado", id: resultadoAdvogado });
    } 
  
    // Autenticar administrad
    // Se não encontrado em nenhuma das tabelas, retorne uma mensagem de erro
    res.status(200).json({ status: 'Credenciais inválidas' });
})
export default app