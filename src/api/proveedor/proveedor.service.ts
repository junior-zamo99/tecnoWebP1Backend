import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProveedorService {
    constructor(
        @InjectModel('proveedor' ) private proveedorModel
    ){}

    async createProveedor(data:any){
        try {
            const proveedor= await this.proveedorModel.create(data)
            return {data:proveedor}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo crear el proveedor'}  
        }
    }

    async getProveedores(){
        try {
            const proveedores=await this.proveedorModel.find()
            return {data:proveedores}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo obtener los proveedores'}  
        }
    }
}
