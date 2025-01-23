import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolService {

    constructor(
        @InjectModel('rol' ) private rolModel
    ){}

    async createRol(data:any){
        try {
            const rol= await this.rolModel.create(data)
            return {data:rol}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo crear el rol'}  
        }
    }
    
    async getRoles(){
        try {
            const roles=await this.rolModel.find().populate('funcionalidades')
            return {data:roles}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo obtener los roles'}  
        }
    }

    async updateRol(id: any, data: any) {
        try {

            
            const rol = await this.rolModel.findOneAndUpdate({ _id: id }, {
                nombre: data.nombre,
                funcionalidades: data.funcionalidades
            });
            return rol;
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo actualizar el rol'}  
        }
    }

    async getRol(id: any) {
        try {
            const rol = await this.rolModel.findOne({ _id: id}).populate('funcionalidades');
            return rol;
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo obtener el rol '}  
        }
    }

}
