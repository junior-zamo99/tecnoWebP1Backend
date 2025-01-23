import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlmacenService {
    constructor(
        @InjectModel('almacen' ) private almacenModel
    ){}

    async createAlmacen(data:any){
        try {
            const almacen= await this.almacenModel.create(data)
            return {data:almacen}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo crear el proveedor'}  
        }
    }

    async getAlmacenes(){
        try {
            const almacenes=await this.almacenModel.find()
            return {data:almacenes}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo obtener los proveedores'}  
        }
    }
}
