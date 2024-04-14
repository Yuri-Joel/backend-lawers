import express from 'express'
import { AllAdvogado, CreateAdvogado, DeleteAdvogado, GetAdvogado, UpdateAdvogado } from '../models/advogadoModel.js'
import {hash}from 'bcrypt'
import { Request, Response } from 'express'
import { VerificarEmail } from '../models/usuarioModel.js'
import { Validateall } from './UsuarioControllers.js'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'



const router = express.Router()

router.get("/getadvogado/:id", async(req: Request,res: Response)=>{

    const id: string = req.params.id;
    const idNumber: number = parseInt(id, 10);
    const dados: any = await GetAdvogado(idNumber)

    res.status(200).json({dados})

})

router.get("/getadvogado", async (_, res) => {
    const dados: any = await AllAdvogado()
    res.status(200).json({ dados })

})


router.post("/createadvogado", async (req, res) => {
    
const {nome, email, senha, telefone, serie} = req.body
    const result: any = await VerificarEmail(email, "advogado")

    if (!result || result.length === 0) {

        const validar: boolean | undefined = await Validateall(nome, email, senha, telefone);

        if (validar) {
            const newsenha: string = await hashpassword(senha)
            const uuid: string = uuidv4();
            const resultSerie: any = await axios.post(`http://localhost:9000/verifySerialNumber`,{serie})
            console.log(resultSerie.data);
            if(resultSerie.data.exists == true){

                
       const values : any = [
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

    ]

    
    const dados: any = await CreateAdvogado(values)
  await axios.post(`http://localhost:9000/blockSerialNumber`,{serie})
  .then((res)=> console.log(res.data) )
    .catch((err)=> console.log(err))


    res.status(200).json({ dados })
} else{
                return res.status(200).json({ status: 'Erro! numero de serie invalido' });
}
        } else {
            return res.status(200).json({ status: 'Erro! na autenticação' });
        }
    } else {
        return res.status(200).json({ status: "Advogado Já Cadastrado" })
    }
})



router.put("/updateadvogado/:id", async (req, res) => {

    const {id}: any = req.params
    const idNumber: number = parseInt(id, 10);
    const senha: string = await hashpassword(req.body.senha)
    const values: any = [
        req.body.nome,
        req.body.serie,
        req.body.email,
        senha,
        req.body.especializacao,
        req.body.Descricao_Profissional,
        req.body.Outras_Informacoes
    ]

    const dados: any = await UpdateAdvogado(values, idNumber)

    res.status(200).json({ dados })

})

router.delete("/deleteadvogado/:id", async (req, res) => {

    const { id } = req.params;
    const idNumber: number = parseInt(id, 10);
    
    const dados: any = await DeleteAdvogado(idNumber)

    res.status(200).json({ dados })

})

export default router;


export const hashpassword = async(senha: string)=>{

    const hashSenha:any = hash(senha, 5)

    return hashSenha;

}