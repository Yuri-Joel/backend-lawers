//import express, { Response, Request } from "express";
/* 

import { Agendamento, ResponderReuniao } from "../models/AgendamentoModel.js";
import { createTransport } from 'nodemailer';




const app = express.Router()
app.post('/agendar-reuniao', async (req:Request, res: Response) => {
    const { idAdvogado, idUsuario, informacoes, data} = req.body;

const estado: string = "Pendente" ;


        const values: any = [
            idAdvogado,
            idUsuario,
            informacoes,
            data,
            estado
        ]
const result: any =  await Agendamento(values)

res.status(200).json({result})
    
});


app.post('/responder-reuniao', async(req:Request, res: Response) => {
    const { idReuniao, resposta } = req.body;
    const result: any = await ResponderReuniao(idReuniao, resposta)

    console.log(result);
    
    // Enviar e-mail para o usuário notificando a resposta
    const mailOptions: object = {
        to: 'beneditonvila@gmail.com', // Substituir pelo e-mail do usuário
        subject: 'Resposta à solicitação de reunião',
        text: `Sua solicitação de reunião foi ${resposta == 'aceito' ? 'aceita' : 'negada'}.`,
    };
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user:  'ceoyuri23@gmail.com',
            pass: 'cume iuee ojjg qjls',
        },
    });
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
        } else {
            console.log('E-mail enviado: ', info.response);
        }
    });

    res.json({ success: true, message: 'Resposta à reunião registrada com sucesso!' });
});

export default app; */