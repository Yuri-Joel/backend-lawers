/* import { prisma } from "../PrismaConnect/PrismaConnect.js";



export const Agendamento = (data: any) =>{
    
    return new Promise((resolve, reject) => {
      prisma.reunioes.create({
        data: {
            ID_Advogado: data[0],
            ID_Usuario: data[1],
            Informacoes: data[2],
            Data_Reuniao: data[3],
            Status: data[4],

        }
      }).then(()=> resolve("cadastrado"))
      .catch((err:any)=> reject(err))
    })
   
}

export const ResponderReuniao = async (idAdvogado: any, resposta: any)=>{
  const where = {
    // Substitua 'idAdvogado' pelo valor real do ID do advogado

  };
    try {
    return await new Promise((resolve, reject) => {

      prisma.reunioes.update({
        where:{
          ID_Advogado: idAdvogado,
          Id_Reuniao: 1
        },
        data: {
          Status: resposta,
        }
      }).then(() => resolve("Actualizado"))
        .catch((err: any) => reject(err));
    });
  } finally {
    return await prisma.$disconnect();
  }
           
        }
    
 */