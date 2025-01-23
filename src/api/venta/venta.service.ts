import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VentaService {
    

    constructor(
        @InjectModel('venta') private ventaModel,
        @InjectModel('producto') private productoModel,
        @InjectModel('ventaDetalle') private ventaDetalleModel
    ) { }

   

    async getVentas(inicio,fin) {
      try {

        const ventas = await this.ventaModel.find({createdAT:{
            $gte:new Date(inicio+'T00:00:00'),
            $lte:new Date(fin+'T23:59:59'),
        }}).populate('cliente').sort({createdAT: -1})
        return {data:ventas};    
      } catch (error) {
        return {data:undefined, message:'no se pudo obtener las ventas'}
      }
    }

    async getVentasConDetalles(inicio,fin) {
        try {
  
          const ventas = await this.ventaModel.find({createdAT:{
              $gte:new Date(inicio+'T00:00:00'),
              $lte:new Date(fin+'T23:59:59'),
          }}).populate('cliente').sort({createdAT: -1})
          const ventasConDetalles = await Promise.all(ventas.map(async venta=>{
              const detalles = await this.ventaDetalleModel.find({venta:venta._id}).populate('producto').populate('variedad')
              return {venta,detalles}
          }))
          return {data:ventasConDetalles};    
        } catch (error) {
          return {data:undefined, message:'no se pudo obtener las ventas'}
        }

    }

    async getVenta(id) {
        try {
            const venta = await this.ventaModel.findOne({_id:id}).populate('cliente')
            if(!venta){
                return {data:undefined, message:'no se pudo obtener el ingreso'}
            }else{
                const detalles = await this.ventaDetalleModel.find({venta:id}).populate('producto').populate('variedad')
                return {data:{venta,detalles}}
            }
        } catch (error) {
            console.log(error)
            return {data:undefined, message:'no se pudo obtener la venta'}
        }
    }  


   async cambiarEstadoVenta(id,data) {
        try {
            console.log(data)
            const venta = await this.ventaModel.findOne({_id:id})
            if(!venta){
                return {data:undefined, message:'no se pudo obtener el ingreso'}
            }else{
               const VentaUpdate = await this.ventaModel.findOneAndUpdate({_id:id},{estado:data.estado})
               console.log(VentaUpdate)
               let booEstado
               if(data.estado=='Cancelado'){
                   booEstado=false
                }else if(data.estado=='Confirmado'){
                    booEstado=true
                }
                console.log(booEstado)
                await this.ventaDetalleModel.updateMany({venta:id},{estado_:data.estado_,estado:booEstado})
                
                return {data:VentaUpdate}
            }
        } catch (error) {
            return {data:undefined, message:'no se pudo cambiar el estado de la venta'}
        }
    }
}
