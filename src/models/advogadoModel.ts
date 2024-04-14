
import { prisma } from "../PrismaConnect/PrismaConnect.js";

export const GetAdvogado = async (id: any)=> {

   
 
    return new Promise((resolve, reject) => {
   const res =  prisma.advogado.findFirst({
   where: {
    id,
   }
   })
     if(res){
            resolve(res)
        } else reject(res)
    })
   
 
}

export const AllAdvogado = async () => {
       const res = await prisma.advogado.findMany()
   
 return res;

}

export const CreateAdvogado =async (data:any)=>{
  
  return new Promise((resolve, reject) => {

   prisma.advogado.create({
    data:{
      id : data[9],
      nome: data[0],
      serie: data[1],
      email: data[2],
      telefone: data[3],
      senha :data[4],
      Especializacao: data[5],
      Descricao_Profissional: data[6],
      Horarios_Disponiveis: data[7],
      Outras_Informacoes: data[8]
    }
   }).then(()=> resolve("Cadastrado"))
     .catch((err: any) => reject(`ERRO ao cadastrar ${err}`))
  })
}

export const UpdateAdvogado = async(data: any, id: any) => {
    const res = await prisma.advogado.update({
        
     where: {
      id        
    }
 ,
     data:{
          nome: data[0],
          serie: data[1],
          email: data[2],
          senha :data[3],
          Especializacao: data[4],
          Descricao_Profissional: data[5],
          Horarios_Disponiveis: data[6],
          Outras_Informacoes: data[5]
        }
       })
       return res? "actualizado": "erro"
}


export const DeleteAdvogado =async (id: any) => {
  
  const res = await prisma.advogado.delete({
    where:{
        id,
    }
  })
  return res? "deletado": "erro"

}

