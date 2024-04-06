import {compare} from 'bcrypt';
import { prisma } from '../PrismaConnect/PrismaConnect.js';
// import jwt from 'jsonwebtoken';

// const chaveSecreta = 'sua_chave_secreta';
export const autenticar = async (email: any, senha: any, tipo: string) => {

  let user: any ;
    if (tipo === "usuario") {
        user = await prisma.usuario.findFirst({
            where: {
                email
            }
        });
    } else if (tipo === "advogado") {
        user = await prisma.advogado.findFirst({
            where: {
                email
            }
        });}
    try {

        // Verifique a tabela correspondente
        if (user.length > 0) {
            // Usuário encontrado, verifique a senha usando bcrypt
            const senhaCorreta = await compare(senha, user.senha);

            if (senhaCorreta) {
                // Senha correta, retorne uma resposta adequada
              /*   const token = jwt.sign({ id: user.id, tipo }, chaveSecreta);
                return { token }; */
                return user.id;       
            }
        }
        // Se não encontrado na tabela, ou senha incorreta, retorne uma mensagem de erro
        return { erro: 'Credenciais inválidas' };
    } catch (erro) {
        // Trate erros de consulta ou outras exceções
        return { erro: 'Erro durante a autenticação' };
    }
}