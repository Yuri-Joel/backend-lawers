
import { prisma } from "../PrismaConnect/PrismaConnect.js"




export const createUsers = async(data:any)=>{
   
    return new Promise( (resolve, reject) => {
      
        prisma.usuario.create({
            data:{
                id: data[4],
                nome: data[0],
                email: data[1],
                senha: data[2],
                telefone: data[3]
            }
        }).then(()=> resolve("cadastrado"))
        .catch((err: any)=> reject(err))
       
        })
}


export const VerificarEmail = (email: any, tipo:string)=>{
    return new Promise((resolve, reject) => {

        if(tipo =="usuario"){
        prisma.usuario.findFirst({
                where: {
                    email
                }
        }).then((data) => resolve(data))
            .catch((err: any) => reject(err))

     } else if (tipo == "advogado"){
            prisma.advogado.findFirst({
                where: {
                    email
                }
            }).then((data) => resolve(data))
                .catch((err: any) => reject(err))
     }
    })
}