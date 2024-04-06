import express,{Request, Response}from 'express'
import { createUsers, VerificarEmail } from '../models/usuarioModel.js'
import { hashpassword } from './AdvogadoControllers.js'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()


router.post("/createuser", async (req: Request, res: Response) => {
   
    const { email, nome ,telefone, senha } = req.body
    const result: any = await VerificarEmail(email, "usuario")

    if (!result || result.length === 0){
       
        const validar: boolean | undefined = await Validateall(nome, email, senha, telefone);

        if (validar) {

            const uuid = uuidv4()
        const newsenha: string = await hashpassword(req.body.senha)
        const values: any = [
           nome,
           email,
           newsenha,
           telefone,
           uuid
        ]

        const dados: any = await createUsers(values)

        return res.status(200).json({ dados })
        } else {
            return res.status(200).json({ status: 'Erro! na autenticação' });
        }
} else{
        return res.status(200).json({ status: "usuario Já Cadastrado" })
}
})

export default router

export const Validateall = async (nome: string, email: string, senha: string, telefone: string) => {

    const isName = await ValidateName(nome);
    console.log(isName)
    const isPass = await Validatepass(senha);
    console.log(isPass)
    const isNumber = await ValidateNumber(telefone)
    console.log(isNumber)
    const isEmail = await ValidateEmail(email);
    console.log(isEmail);


    return isNumber && isName && isPass && isEmail
}

export const ValidateName = async (nome: string) => {
    if (nome.length < 3) {

        return false;
    }
    const regexNome = /^[a-zA-Z\s]+$/;
    return regexNome.test(nome);

}
export const ValidateEmail = async (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-z]{2,6}$/i;

    return regex.test(email)
}

export const Validatepass = async (senha:string) => {
    if (senha.length < 6) {
        return false
    }
    return true;
}

export const ValidateNumber = async (telefone:string) => {

    if (telefone.length < 7) {

        return false
    }

    if (telefone) {
        // Exemplo de uso:

        const formattedPhoneNumber = await formatPhoneNumber(telefone);
        console.log(formattedPhoneNumber); // Saída: +244935699190

        const result = await validatePhoneNumber(formattedPhoneNumber)
            .then(data => {
                if (data) {
                    console.log('Mensagem:', data.message);
                    if (data.message == "This is an Angola valid phone number") {
                        return true;
                    }

                } else {
                    console.log('Não foi possível obter os dados.')
                    return false;
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
                return false
            });

        return result
    };


}
async function validatePhoneNumber(phoneNumber: any) {
    try {
        const response = await axios.get(`https://angolaapi.onrender.com/api/v1/validate/phone/${phoneNumber}`);
        return response.data;
    } catch (erro: unknown) {
        console.error('Ocorreu um erro ao fazer a requisição:', erro);
        return null;
    }
}
async function formatPhoneNumber(number: string) {
    // Remover todos os caracteres que não sejam dígitos
    const cleanedNumber = number.replace(/\D/g, '');

    // Verificar se o número começa com "244" ou "+244"
    const startsWith244 = /^244/.test(cleanedNumber);
    const startsWithPlus244 = /^\+244/.test(cleanedNumber);

    // Se o número não começar com "244" ou "+244", adicionar "+244" na frente
    let formattedNumber = cleanedNumber;
    if (!startsWith244 && !startsWithPlus244) {
        formattedNumber = '+244' + cleanedNumber;
    }

    return formattedNumber;
}
