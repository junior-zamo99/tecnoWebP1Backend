import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class VisitanteService {
    constructor(
        @InjectModel('categoria') private categoriaModel,
        @InjectModel('producto') private productoModel,
        @InjectModel('producto_galeria') private productoGaleriaModel,
        @InjectModel('producto_variedad') private productoVariedadModel,
        @InjectModel('ingreso') private ingresoModel,
        @InjectModel('ingresoDetalle') private ingresoDetalleModel,
    ){}

    async getProductosTienda(){
        try {
            const productos =await this.productoModel.find({estado:true}).populate('categoria').sort({createdAT:-1})
            const arr_productos = []
            

            for (const element of productos){
                const variaciones = await this.productoVariedadModel.find({producto:element._id,precio:{$gt:0}})
                
                let cantidadesTotal=0

                for(const subItem of variaciones){
                    const unidades= await this.ingresoDetalleModel.find({producto_variedad:subItem._id,estado:true,estado_:'Confirmado'})
                    cantidadesTotal+=unidades.length
                }

             

                if(cantidadesTotal>0){
                    if(variaciones.length>0){
                        arr_productos.push({
                            _id:element._id,
                            titulo:element.titulo,
                            portada:element.portada,
                            slug:element.slug,
                            clasificacion:element.clasificacion,
                            etiqueta:element.etiqueta,
                            categoria:element.categoria,
                            precio:variaciones[0].precio,
                        
                        })
                    }
                }
            } 

            return {data:arr_productos}
        } catch (error) {
            return {data:undefined,message:'Error al obtener los productos de la tienda'}
        }
    }



    

    async getCategoriasTienda(clasificacion){
        try {
            const categorias=await this.categoriaModel.find({genero:clasificacion})
            return {data:categorias}
        } catch (error) {
            return{data:undefined, message:'no se pudo obtener la categoria'}
        }
    }


    async getProductoTienda(slug){
        try {

            const producto = await this.productoModel.findOne({slug:slug}).populate('categoria')
            const arr_variaciones = []
            if(producto){
                const variaciones = await this.productoVariedadModel.find({producto:producto._id,precio:{$gt:0}})
                const galeria=await this.productoGaleriaModel.find({producto:producto._id})
                for(const subItem of variaciones){
                    const unidades= await this.ingresoDetalleModel.find({producto_variedad:subItem._id,estado:true,estado_:'Confirmado'})
                    
                    if(unidades.length>0){
                        arr_variaciones.push({
                            _id:subItem._id,
                            hxd:subItem.hxd,
                            color:subItem.color,
                            talla:subItem.talla,
                            precio:subItem.precio,
                            cantidad:unidades.length,
                            createdAT:subItem.createdAT,
                            producto:subItem.producto,
                            sku:subItem.sku,
                            cantidades:unidades.length
                        })
                    }
                }
                return {data:{producto:producto,variaciones:arr_variaciones,galeria:galeria}}
            }else{
                return {data:undefined, message:'Producto no encontrado'}
            }

           

            

            

        } catch (error) {
            return {data:undefined, message:'Error al obtener el producto'}
        }
    }

}
